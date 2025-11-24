import { EMISSION_FACTORS } from '../constants/emissionFactors';

/**
 * Serviço de Cálculo de Pegada de Carbono
 * Implementa RN04: Arredondamento para 2 casas decimais
 */

class CarbonCalculatorService {
  /**
   * Arredonda valor para 2 casas decimais (RN04)
   */
  roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
  }

  /**
   * Calcula emissões de transporte terrestre
   * @param {string} vehicleType - Tipo de veículo (chave do EMISSION_FACTORS.TRANSPORT_LAND)
   * @param {number} distance - Distância em km
   * @returns {number} Emissões em kg CO₂
   */
  calculateLandTransport(vehicleType, distance) {
    const factor = EMISSION_FACTORS.TRANSPORT_LAND[vehicleType];
    if (!factor) {
      throw new Error('Tipo de veículo inválido');
    }
    const emissions = factor.factor * distance;
    return this.roundToTwoDecimals(emissions);
  }

  /**
   * Calcula emissões de transporte aéreo
   * @param {string} flightType - Tipo de voo (VOO_NACIONAL ou VOO_INTERNACIONAL)
   * @param {number} distance - Distância em km
   * @returns {number} Emissões em kg CO₂
   */
  calculateAirTransport(flightType, distance) {
    const factor = EMISSION_FACTORS.TRANSPORT_AIR[flightType];
    if (!factor) {
      throw new Error('Tipo de voo inválido');
    }
    const emissions = factor.factor * distance;
    return this.roundToTwoDecimals(emissions);
  }

  /**
   * Calcula emissões de energia elétrica
   * @param {number} consumption - Consumo em kWh
   * @returns {number} Emissões em kg CO₂
   */
  calculateEnergy(consumption) {
    const factor = EMISSION_FACTORS.ENERGY.MEDIA_BRASIL;
    const emissions = factor.factor * consumption;
    return this.roundToTwoDecimals(emissions);
  }

  /**
   * Calcula emissões de gás
   * @param {string} gasType - Tipo de gás (GLP ou GAS_NATURAL)
   * @param {number} consumption - Consumo (kg para GLP, m³ para GN)
   * @returns {number} Emissões em kg CO₂
   */
  calculateGas(gasType, consumption) {
    const factor = EMISSION_FACTORS.GAS[gasType];
    if (!factor) {
      throw new Error('Tipo de gás inválido');
    }
    const emissions = factor.factor * consumption;
    return this.roundToTwoDecimals(emissions);
  }

  /**
   * Calcula emissões de atividades domésticas
   * @param {string} activityType - Tipo de atividade
   * @param {number} quantity - Quantidade (banhos, ciclos, usos, dias)
   * @returns {number} Emissões em kg CO₂
   */
  calculateDomesticActivity(activityType, quantity) {
    const factor = EMISSION_FACTORS.DOMESTIC_ACTIVITIES[activityType];
    if (!factor) {
      throw new Error('Tipo de atividade inválido');
    }
    const emissions = factor.factor * quantity;
    return this.roundToTwoDecimals(emissions);
  }

  /**
   * Calcula redução de emissões por reciclagem
   * @param {string} wasteType - Tipo de material reciclado
   * @param {number} quantity - Quantidade em kg
   * @returns {number} Redução de emissões em kg CO₂ (valor negativo)
   */
  calculateWaste(wasteType, quantity) {
    const factor = EMISSION_FACTORS.WASTE[wasteType];
    if (!factor) {
      throw new Error('Tipo de resíduo inválido');
    }
    const emissions = factor.factor * quantity; // Já será negativo
    return this.roundToTwoDecimals(emissions);
  }

  /**
   * Calcula emissões totais de um conjunto de consumos
   * @param {Object} consumptions - Objeto com consumos por categoria
   * @returns {Object} Objeto com emissões por categoria e total
   */
  calculateTotalEmissions(consumptions) {
    let total = 0;
    const breakdown = {
      transport_land: 0,
      transport_air: 0,
      energy: 0,
      gas: 0,
      domestic_activities: 0,
      waste: 0
    };

    // Transporte terrestre
    if (consumptions.transport_land && Array.isArray(consumptions.transport_land)) {
      consumptions.transport_land.forEach(item => {
        const emission = this.calculateLandTransport(item.type, item.distance);
        breakdown.transport_land += emission;
      });
    }

    // Transporte aéreo
    if (consumptions.transport_air && Array.isArray(consumptions.transport_air)) {
      consumptions.transport_air.forEach(item => {
        const emission = this.calculateAirTransport(item.type, item.distance);
        breakdown.transport_air += emission;
      });
    }

    // Energia
    if (consumptions.energy) {
      breakdown.energy = this.calculateEnergy(consumptions.energy);
    }

    // Gás
    if (consumptions.gas && Array.isArray(consumptions.gas)) {
      consumptions.gas.forEach(item => {
        const emission = this.calculateGas(item.type, item.consumption);
        breakdown.gas += emission;
      });
    }

    // Atividades Domésticas
    if (consumptions.domestic_activities && Array.isArray(consumptions.domestic_activities)) {
      consumptions.domestic_activities.forEach(item => {
        const emission = this.calculateDomesticActivity(item.type, item.quantity);
        breakdown.domestic_activities += emission;
      });
    }

    // Resíduos/Reciclagem (valores negativos reduzem o total)
    if (consumptions.waste && Array.isArray(consumptions.waste)) {
      consumptions.waste.forEach(item => {
        const emission = this.calculateWaste(item.type, item.quantity);
        breakdown.waste += emission;
      });
    }

    // Calcular total
    total = breakdown.transport_land + breakdown.transport_air + breakdown.energy + 
            breakdown.gas + breakdown.domestic_activities + breakdown.waste;

    return {
      total: this.roundToTwoDecimals(total),
      breakdown: {
        transport_land: this.roundToTwoDecimals(breakdown.transport_land),
        transport_air: this.roundToTwoDecimals(breakdown.transport_air),
        energy: this.roundToTwoDecimals(breakdown.energy),
        gas: this.roundToTwoDecimals(breakdown.gas),
        domestic_activities: this.roundToTwoDecimals(breakdown.domestic_activities),
        waste: this.roundToTwoDecimals(breakdown.waste)
      }
    };
  }

  /**
   * Calcula emissões mensais a partir de registros diários
   * @param {Array} dailyRecords - Array de registros diários
   * @returns {number} Total de emissões do mês
   */
  calculateMonthlyEmissions(dailyRecords) {
    let total = 0;
    dailyRecords.forEach(record => {
      if (record.emissions) {
        total += record.emissions.total;
      }
    });
    return this.roundToTwoDecimals(total);
  }
}

export default new CarbonCalculatorService();
