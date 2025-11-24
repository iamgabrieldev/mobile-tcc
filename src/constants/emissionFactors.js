/**
 * Fatores de Emissão baseados no Painel Intergovernamental sobre Mudanças Climáticas (IPCC) 2023
 * Todos os valores em kg CO₂ por unidade especificada
 */

export const EMISSION_FACTORS = {
  // Transporte Terrestre (kg CO₂/km)
  TRANSPORT_LAND: {
    CARRO_PEQUENO_GASOLINA: {
      label: 'Carro pequeno (até 1.4L) - Gasolina',
      factor: 0.192,
      unit: 'kg CO₂/km',
      category: 'transport_land'
    },
    CARRO_MEDIO_GASOLINA: {
      label: 'Carro médio (1.5 a 2.0L) - Gasolina',
      factor: 0.232,
      unit: 'kg CO₂/km',
      category: 'transport_land'
    },
    CARRO_GRANDE_GASOLINA: {
      label: 'Carro grande (>2.0L) - Gasolina',
      factor: 0.250,
      unit: 'kg CO₂/km',
      category: 'transport_land'
    },
    CARRO_DIESEL: {
      label: 'Carro - Diesel',
      factor: 0.250,
      unit: 'kg CO₂/km',
      category: 'transport_land'
    },
    ONIBUS_URBANO: {
      label: 'Ônibus urbano',
      factor: 0.105,
      unit: 'kg CO₂/km',
      category: 'transport_land'
    },
    ONIBUS_RODOVIARIO: {
      label: 'Ônibus rodoviário',
      factor: 0.060,
      unit: 'kg CO₂/km',
      category: 'transport_land'
    }
  },

  // Transporte Aéreo (kg CO₂/km)
  TRANSPORT_AIR: {
    VOO_NACIONAL: {
      label: 'Voo nacional (ida e volta)',
      factor: 0.150,
      unit: 'kg CO₂/km',
      category: 'transport_air'
    },
    VOO_INTERNACIONAL: {
      label: 'Voo internacional (ida e volta)',
      factor: 0.200,
      unit: 'kg CO₂/km',
      category: 'transport_air'
    }
  },

  // Consumo de Energia Elétrica (kg CO₂/kWh)
  ENERGY: {
    MEDIA_BRASIL: {
      label: 'Média Brasil',
      factor: 0.084,
      unit: 'kg CO₂/kWh',
      category: 'energy'
    }
  },

  // Consumo de Gás (kg CO₂/unidade)
  GAS: {
    GLP: {
      label: 'Gás de cozinha (GLP)',
      factor: 2.983,
      unit: 'kg CO₂/kg',
      category: 'gas'
    },
    GAS_NATURAL: {
      label: 'Gás natural (GN)',
      factor: 2.000,
      unit: 'kg CO₂/m³',
      category: 'gas'
    }
  },

  // Atividades Domésticas (kg CO₂/unidade)
  DOMESTIC_ACTIVITIES: {
    BANHO_QUENTE: {
      label: 'Banho quente (10 minutos)',
      factor: 2.0,
      unit: 'kg CO₂/banho',
      category: 'domestic_activities'
    },
    LAVAGEM_ROUPAS: {
      label: 'Lavagem de roupas (1 ciclo)',
      factor: 0.275,
      unit: 'kg CO₂/ciclo',
      category: 'domestic_activities'
    },
    SECADORA_ROUPAS: {
      label: 'Secadora de roupas (1 ciclo)',
      factor: 1.0,
      unit: 'kg CO₂/ciclo',
      category: 'domestic_activities'
    },
    FORNO_ELETRICO: {
      label: 'Uso de forno elétrico (1,5 kWh)',
      factor: 0.126,
      unit: 'kg CO₂/uso',
      category: 'domestic_activities'
    },
    CONSUMO_ALIMENTOS: {
      label: 'Consumo diário médio de alimentos',
      factor: 4.5,
      unit: 'kg CO₂/dia',
      category: 'domestic_activities'
    }
  },

  // Resíduos/Reciclagem (kg CO₂ economizado/kg - valores negativos indicam redução)
  WASTE: {
    RECICLAGEM_PAPEL: {
      label: 'Reciclagem de papel',
      factor: -1.8,
      unit: 'kg CO₂/kg',
      category: 'waste'
    },
    RECICLAGEM_PLASTICO: {
      label: 'Reciclagem de plástico',
      factor: -1.5,
      unit: 'kg CO₂/kg',
      category: 'waste'
    },
    RECICLAGEM_VIDRO: {
      label: 'Reciclagem de vidro',
      factor: -0.315,
      unit: 'kg CO₂/kg',
      category: 'waste'
    },
    RECICLAGEM_METAL: {
      label: 'Reciclagem de metal',
      factor: -9.0,
      unit: 'kg CO₂/kg',
      category: 'waste'
    }
  }
};

// Categorias de consumo
export const CONSUMPTION_CATEGORIES = {
  TRANSPORT_LAND: 'Transporte Terrestre',
  TRANSPORT_AIR: 'Transporte Aéreo',
  ENERGY: 'Energia Elétrica',
  GAS: 'Gás',
  DOMESTIC_ACTIVITIES: 'Atividades Domésticas',
  WASTE: 'Resíduos/Reciclagem'
};

// Função auxiliar para obter todos os fatores de uma categoria
export const getFactorsByCategory = (category) => {
  switch(category) {
    case 'TRANSPORT_LAND':
      return EMISSION_FACTORS.TRANSPORT_LAND;
    case 'TRANSPORT_AIR':
      return EMISSION_FACTORS.TRANSPORT_AIR;
    case 'ENERGY':
      return EMISSION_FACTORS.ENERGY;
    case 'GAS':
      return EMISSION_FACTORS.GAS;
    case 'DOMESTIC_ACTIVITIES':
      return EMISSION_FACTORS.DOMESTIC_ACTIVITIES;
    case 'WASTE':
      return EMISSION_FACTORS.WASTE;
    default:
      return {};
  }
};
