/**
 * Dados de teste para desenvolvimento
 * Use estes dados para testar rapidamente o aplicativo
 */

export const sampleConsumptions = [
  {
    date: new Date(2024, 9, 1).toISOString(),
    consumptions: {
      transport_land: [
        { type: 'CARRO_PEQUENO_GASOLINA', distance: 25 }
      ],
      transport_air: [],
      energy: 12.5,
      gas: [
        { type: 'GLP', consumption: 1.5 }
      ]
    }
  },
  {
    date: new Date(2024, 9, 2).toISOString(),
    consumptions: {
      transport_land: [
        { type: 'ONIBUS_URBANO', distance: 15 }
      ],
      transport_air: [],
      energy: 10.2,
      gas: []
    }
  },
  {
    date: new Date(2024, 9, 3).toISOString(),
    consumptions: {
      transport_land: [
        { type: 'CARRO_MEDIO_GASOLINA', distance: 45 }
      ],
      transport_air: [],
      energy: 15.8,
      gas: [
        { type: 'GLP', consumption: 2.0 }
      ]
    }
  }
];

export const expectedResults = {
  day1: {
    transport_land: 4.80,  // 25 * 0.192
    energy: 1.05,          // 12.5 * 0.084
    gas: 4.47,             // 1.5 * 2.983
    total: 10.32
  },
  day2: {
    transport_land: 1.58,  // 15 * 0.105
    energy: 0.86,          // 10.2 * 0.084
    total: 2.44
  },
  day3: {
    transport_land: 10.44, // 45 * 0.232
    energy: 1.33,          // 15.8 * 0.084
    gas: 5.97,             // 2.0 * 2.983
    total: 17.74
  }
};

/**
 * Usuário de teste (use após configurar Firebase)
 */
export const testUser = {
  email: 'teste@carbono.com',
  password: 'teste123456'
};

/**
 * Cenários de teste para diferentes padrões de uso
 */
export const testScenarios = {
  // Usuário que usa muito carro
  highTransportUser: {
    daily: {
      transport_land: [
        { type: 'CARRO_GRANDE_GASOLINA', distance: 60 }
      ],
      energy: 10,
      gas: []
    },
    expectedDailyTotal: 15.84
  },
  
  // Usuário que viaja muito de avião
  frequentFlyer: {
    weekly: {
      transport_air: [
        { type: 'VOO_NACIONAL', distance: 1000 }
      ]
    },
    expectedWeeklyTotal: 150
  },
  
  // Usuário consciente (baixo consumo)
  ecoFriendly: {
    daily: {
      transport_land: [
        { type: 'ONIBUS_URBANO', distance: 10 }
      ],
      energy: 5,
      gas: []
    },
    expectedDailyTotal: 1.47
  },
  
  // Usuário médio brasileiro
  averageBrazilian: {
    daily: {
      transport_land: [
        { type: 'CARRO_PEQUENO_GASOLINA', distance: 30 }
      ],
      energy: 12,
      gas: [
        { type: 'GLP', consumption: 0.5 }
      ]
    },
    expectedDailyTotal: 8.25
  }
};
