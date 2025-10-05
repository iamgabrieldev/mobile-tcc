/**
 * Serviço de Dicas Personalizadas (RF04)
 * Sugere dicas baseadas nos padrões de consumo do usuário
 */

class TipsService {
  constructor() {
    this.tips = {
      transport_land: [
        {
          id: 'transport_1',
          title: 'Utilize transporte público',
          description: 'Ônibus urbanos emitem menos CO₂ por passageiro. Considere usar transporte público para trajetos diários.',
          impact: 'Alta',
          icon: 'bus'
        },
        {
          id: 'transport_2',
          title: 'Carona compartilhada',
          description: 'Compartilhar viagens de carro pode reduzir suas emissões pela metade ou mais.',
          impact: 'Alta',
          icon: 'car-multiple'
        },
        {
          id: 'transport_3',
          title: 'Considere veículos mais eficientes',
          description: 'Carros menores consomem menos combustível e emitem menos CO₂.',
          impact: 'Média',
          icon: 'car-electric'
        },
        {
          id: 'transport_4',
          title: 'Caminhe ou use bicicleta',
          description: 'Para distâncias curtas, considere caminhar ou pedalar. Sua saúde e o planeta agradecem!',
          impact: 'Alta',
          icon: 'bike'
        }
      ],
      transport_air: [
        {
          id: 'air_1',
          title: 'Evite voos quando possível',
          description: 'Voos são uma das formas mais intensivas em carbono de transporte. Considere alternativas terrestres.',
          impact: 'Muito Alta',
          icon: 'airplane-off'
        },
        {
          id: 'air_2',
          title: 'Prefira voos diretos',
          description: 'Voos diretos emitem menos CO₂ que voos com conexões, pois evitam decolagens/pousos extras.',
          impact: 'Média',
          icon: 'airplane'
        }
      ],
      energy: [
        {
          id: 'energy_1',
          title: 'Troque para lâmpadas LED',
          description: 'Lâmpadas LED consomem até 80% menos energia que lâmpadas incandescentes.',
          impact: 'Média',
          icon: 'lightbulb-on'
        },
        {
          id: 'energy_2',
          title: 'Desligue aparelhos em standby',
          description: 'Aparelhos em standby consomem energia continuamente. Desligue-os da tomada quando não estiver usando.',
          impact: 'Baixa',
          icon: 'power-plug-off'
        },
        {
          id: 'energy_3',
          title: 'Use ar-condicionado com moderação',
          description: 'Ajuste a temperatura para 23-24°C e use ventiladores para circular o ar.',
          impact: 'Alta',
          icon: 'air-conditioner'
        },
        {
          id: 'energy_4',
          title: 'Aproveite a luz natural',
          description: 'Abra cortinas e persianas durante o dia para reduzir o uso de iluminação artificial.',
          impact: 'Média',
          icon: 'weather-sunny'
        }
      ],
      gas: [
        {
          id: 'gas_1',
          title: 'Tampe as panelas ao cozinhar',
          description: 'Cozinhar com a panela tampada reduz o tempo de cozimento e o consumo de gás.',
          impact: 'Baixa',
          icon: 'pot-steam'
        },
        {
          id: 'gas_2',
          title: 'Use a chama adequada',
          description: 'Ajuste a chama para que fique do tamanho do fundo da panela, evitando desperdício.',
          impact: 'Baixa',
          icon: 'fire'
        },
        {
          id: 'gas_3',
          title: 'Considere energia solar',
          description: 'Aquecedores solares podem reduzir significativamente o uso de gás para aquecer água.',
          impact: 'Alta',
          icon: 'solar-power'
        }
      ]
    };
  }

  /**
   * Gera dicas personalizadas baseadas no consumo do usuário
   * @param {Object} emissions - Objeto com breakdown de emissões
   * @returns {Array} Array de dicas personalizadas
   */
  getPersonalizedTips(emissions) {
    const personalizedTips = [];
    const breakdown = emissions.breakdown;

    // Identificar categorias com maior emissão
    const categories = [
      { key: 'transport_land', value: breakdown.transport_land },
      { key: 'transport_air', value: breakdown.transport_air },
      { key: 'energy', value: breakdown.energy },
      { key: 'gas', value: breakdown.gas }
    ];

    // Ordenar por emissão (maior para menor)
    categories.sort((a, b) => b.value - a.value);

    // Adicionar 2 dicas da categoria com maior emissão
    if (categories[0].value > 0) {
      const topCategoryTips = this.tips[categories[0].key];
      personalizedTips.push(...topCategoryTips.slice(0, 2));
    }

    // Adicionar 1 dica da segunda categoria
    if (categories[1].value > 0) {
      const secondCategoryTips = this.tips[categories[1].key];
      personalizedTips.push(secondCategoryTips[0]);
    }

    // Adicionar dicas gerais se houver espaço
    if (personalizedTips.length < 5) {
      categories.forEach(cat => {
        if (cat.value > 0 && personalizedTips.length < 5) {
          const remainingTips = this.tips[cat.key].filter(
            tip => !personalizedTips.find(pt => pt.id === tip.id)
          );
          if (remainingTips.length > 0) {
            personalizedTips.push(remainingTips[0]);
          }
        }
      });
    }

    return personalizedTips;
  }

  /**
   * Obtém todas as dicas de uma categoria
   */
  getTipsByCategory(category) {
    return this.tips[category] || [];
  }

  /**
   * Obtém todas as dicas disponíveis
   */
  getAllTips() {
    return Object.values(this.tips).flat();
  }
}

export default new TipsService();
