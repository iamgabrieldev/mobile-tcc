/**
 * Serviço de Cálculo de Árvores para Compensação
 * Calcula quantas árvores são necessárias para compensar emissões de CO₂
 */

class TreeService {
  /**
   * Quantidade média de CO₂ que uma árvore absorve por ano (em kg)
   * Baseado em estudos científicos: uma árvore absorve aproximadamente 21-25 kg CO₂/ano
   */
  static CO2_ABSORBED_PER_TREE_PER_YEAR = 22; // kg CO₂/ano

  /**
   * Calcula o número de árvores necessárias para compensar emissões
   * @param {number} totalEmission - Emissão total em kg CO₂
   * @param {string} period - Período: 'daily', 'weekly', 'monthly', 'yearly'
   * @returns {Object} Número de árvores e informações adicionais
   */
  calculateTreesNeeded(totalEmission, period = 'monthly') {
    if (totalEmission <= 0) {
      return {
        trees: 0,
        treesRounded: 0,
        co2PerTree: TreeService.CO2_ABSORBED_PER_TREE_PER_YEAR,
        period,
        message: 'Nenhuma árvore necessária - você não teve emissões!'
      };
    }

    // Converter emissões para período anual
    let annualEmission = totalEmission;
    
    switch(period) {
      case 'daily':
        annualEmission = totalEmission * 365;
        break;
      case 'weekly':
        annualEmission = totalEmission * 52;
        break;
      case 'monthly':
        annualEmission = totalEmission * 12;
        break;
      case 'yearly':
        // já está em anual
        break;
    }

    // Calcular número de árvores
    const treesNeeded = annualEmission / TreeService.CO2_ABSORBED_PER_TREE_PER_YEAR;
    const treesRounded = Math.ceil(treesNeeded);

    return {
      trees: treesNeeded,
      treesRounded,
      co2PerTree: TreeService.CO2_ABSORBED_PER_TREE_PER_YEAR,
      period,
      annualEmission,
      message: this.getMotivationalMessage(treesRounded)
    };
  }

  /**
   * Calcula árvores necessárias para compensar emissões mensais
   * @param {number} monthlyEmission - Emissão mensal em kg CO₂
   * @returns {Object} Dados de compensação
   */
  calculateTreesForMonthly(monthlyEmission) {
    return this.calculateTreesNeeded(monthlyEmission, 'monthly');
  }

  /**
   * Calcula árvores necessárias para compensar emissões semanais
   * @param {number} weeklyEmission - Emissão semanal em kg CO₂
   * @returns {Object} Dados de compensação
   */
  calculateTreesForWeekly(weeklyEmission) {
    return this.calculateTreesNeeded(weeklyEmission, 'weekly');
  }

  /**
   * Calcula árvores necessárias para compensar emissões diárias
   * @param {number} dailyEmission - Emissão diária em kg CO₂
   * @returns {Object} Dados de compensação
   */
  calculateTreesForDaily(dailyEmission) {
    return this.calculateTreesNeeded(dailyEmission, 'daily');
  }

  /**
   * Compara redução de emissões com plantio de árvores
   * @param {number} previousEmission - Emissão anterior
   * @param {number} currentEmission - Emissão atual
   * @param {string} period - Período de comparação
   * @returns {Object} Comparação em termos de árvores
   */
  compareReductionWithTrees(previousEmission, currentEmission, period = 'monthly') {
    const reduction = previousEmission - currentEmission;
    
    if (reduction <= 0) {
      return {
        reduction: 0,
        equivalentTrees: 0,
        message: 'Suas emissões não reduziram neste período.'
      };
    }

    const treesEquivalent = this.calculateTreesNeeded(reduction, period);

    return {
      reduction,
      equivalentTrees: treesEquivalent.treesRounded,
      message: `Sua redução equivale a ${treesEquivalent.treesRounded} árvore(s) plantada(s)!`
    };
  }

  /**
   * Calcula o impacto de diferentes ações em termos de árvores
   * @param {string} action - Tipo de ação
   * @param {number} value - Valor da ação
   * @returns {Object} Impacto em árvores
   */
  calculateActionImpact(action, value) {
    let co2Saved = 0;

    switch(action) {
      case 'CAR_TO_BIKE':
        // Trocar carro por bicicleta (economia por km)
        co2Saved = value * 0.192; // kg CO₂ economizado por km
        break;
      case 'LED_BULB':
        // Trocar lâmpada por LED (economia por hora de uso/ano)
        co2Saved = value * 0.04; // kg CO₂ economizado por hora/ano
        break;
      case 'REUSABLE_BAG':
        // Usar sacola reutilizável (por uso)
        co2Saved = value * 0.04; // kg CO₂ economizado por sacola
        break;
      case 'PLANT_BASED_MEAL':
        // Refeição à base de plantas vs carne (por refeição)
        co2Saved = value * 2.5; // kg CO₂ economizado por refeição
        break;
    }

    const treesEquivalent = co2Saved / TreeService.CO2_ABSORBED_PER_TREE_PER_YEAR;

    return {
      action,
      co2Saved,
      treesEquivalent: treesEquivalent.toFixed(2),
      message: `Esta ação economiza ${co2Saved.toFixed(2)} kg CO₂, equivalente a ${treesEquivalent.toFixed(2)} árvore(s) por ano!`
    };
  }

  /**
   * Retorna mensagem motivacional baseada no número de árvores
   * @param {number} trees - Número de árvores
   * @returns {string} Mensagem motivacional
   */
  getMotivationalMessage(trees) {
    if (trees === 0) {
      return '🌟 Parabéns! Suas emissões estão zeradas!';
    } else if (trees <= 5) {
      return '🌱 Apenas algumas árvores compensariam suas emissões! Continue assim!';
    } else if (trees <= 10) {
      return '🌳 Um pequeno bosque compensaria suas emissões. Vamos reduzir?';
    } else if (trees <= 50) {
      return '🌲 Uma pequena floresta seria necessária. Há espaço para melhorias!';
    } else {
      return '🌴 Uma grande floresta seria necessária. Vamos trabalhar juntos para reduzir?';
    }
  }

  /**
   * Fornece sugestões de ações para reduzir árvores necessárias
   * @param {number} trees - Número de árvores necessárias
   * @returns {Array} Lista de sugestões
   */
  getSuggestions(trees) {
    const suggestions = [];

    if (trees > 10) {
      suggestions.push({
        title: 'Use transporte público',
        impact: 'Pode reduzir até 20% das árvores necessárias',
        icon: '🚌'
      });
    }

    if (trees > 5) {
      suggestions.push({
        title: 'Reduza o consumo de carne',
        impact: 'Pode reduzir até 15% das árvores necessárias',
        icon: '🥗'
      });
    }

    if (trees > 0) {
      suggestions.push({
        title: 'Economize energia em casa',
        impact: 'Pode reduzir até 10% das árvores necessárias',
        icon: '💡'
      });
    }

    suggestions.push({
      title: 'Plante uma árvore!',
      impact: 'Compense diretamente suas emissões',
      icon: '🌱'
    });

    return suggestions;
  }
}

export default new TreeService();

