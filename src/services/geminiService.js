import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Serviço de Integração com Google Gemini AI
 * Analisa hábitos de carbono e fornece recomendações personalizadas
 */

class GeminiService {
  constructor() {
    // IMPORTANTE: Em produção, armazene a API Key em variáveis de ambiente
    // Por enquanto, ela precisa ser configurada aqui
    this.apiKey = 'AIzaSyCd_RbIylobdUBdE2OkB4ObBUiM8-FBujk'; // Substituir pela sua API Key do Gemini
    this.genAI = null;
    this.model = null;
    
    this.initializeAI();
  }

  /**
   * Inicializa o cliente Gemini AI
   */
  initializeAI() {
    try {
      if (this.apiKey && this.apiKey !== 'SUA_API_KEY_AQUI') {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      }
    } catch (error) {
      console.error('Erro ao inicializar Gemini AI:', error);
    }
  }

  /**
   * Configura a API Key do Gemini
   * @param {string} apiKey - API Key do Google Gemini
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    this.initializeAI();
  }

  /**
   * Verifica se a API está configurada
   * @returns {boolean} True se configurada
   */
  isConfigured() {
    return this.model !== null && this.apiKey !== 'SUA_API_KEY_AQUI';
  }

  /**
   * Analisa hábitos de consumo e fornece recomendações
   * @param {Object} userData - Dados do usuário incluindo emissões
   * @returns {Object} Análise e recomendações da IA
   */
  async analyzeHabits(userData) {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'API Key do Gemini não configurada',
        mockData: this.getMockAnalysis(userData)
      };
    }

    try {
      const prompt = this.buildAnalysisPrompt(userData);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parsear resposta da IA
      const analysis = this.parseAnalysisResponse(text);

      return {
        success: true,
        analysis,
        rawText: text
      };
    } catch (error) {
      console.error('Erro ao analisar hábitos:', error);
      return {
        success: false,
        error: error.message,
        mockData: this.getMockAnalysis(userData)
      };
    }
  }

  /**
   * Constrói o prompt para análise de hábitos
   * @param {Object} userData - Dados do usuário
   * @returns {string} Prompt formatado
   */
  buildAnalysisPrompt(userData) {
    const {
      totalEmissions = 0,
      transportEmissions = 0,
      energyEmissions = 0,
      gasEmissions = 0,
      period = 'mensal',
      previousEmissions = 0
    } = userData;

    const trend = previousEmissions > 0 
      ? ((totalEmissions - previousEmissions) / previousEmissions * 100).toFixed(1)
      : 0;

    return `
Você é um especialista em sustentabilidade e redução de pegada de carbono. Analise os seguintes dados de emissões de CO₂ de um usuário e forneça uma análise detalhada e personalizada:

DADOS DO USUÁRIO:
- Emissão total ${period}: ${totalEmissions.toFixed(2)} kg CO₂
- Emissões de transporte: ${transportEmissions.toFixed(2)} kg CO₂ (${((transportEmissions/totalEmissions)*100).toFixed(1)}%)
- Emissões de energia: ${energyEmissions.toFixed(2)} kg CO₂ (${((energyEmissions/totalEmissions)*100).toFixed(1)}%)
- Emissões de gás: ${gasEmissions.toFixed(2)} kg CO₂ (${((gasEmissions/totalEmissions)*100).toFixed(1)}%)
- Tendência em relação ao período anterior: ${trend > 0 ? '+' : ''}${trend}%

Por favor, forneça:

1. ANÁLISE GERAL (2-3 frases):
   - Avaliação geral dos hábitos do usuário
   - Comparação com média nacional/mundial
   
2. PONTOS FORTES (2-3 pontos):
   - Aspectos positivos identificados
   - O que o usuário está fazendo bem
   
3. ÁREAS DE MELHORIA (3-5 pontos específicos):
   - Principais categorias que precisam de atenção
   - Oportunidades concretas de redução
   
4. RECOMENDAÇÕES PRÁTICAS (5-7 ações):
   - Ações específicas e imediatas que o usuário pode tomar
   - Estimativa de impacto de cada ação
   - Priorize do mais impactante ao menos impactante

5. META SUGERIDA:
   - Meta de redução realista para o próximo mês
   - Percentual de redução sugerido

Seja encorajador, prático e específico. Use linguagem acessível e motivadora.
`;
  }

  /**
   * Parseia a resposta da IA em estrutura organizada
   * @param {string} text - Texto da resposta da IA
   * @returns {Object} Análise estruturada
   */
  parseAnalysisResponse(text) {
    // Estrutura básica para a análise
    const analysis = {
      summary: '',
      strengths: [],
      improvements: [],
      recommendations: [],
      goal: ''
    };

    try {
      // Extrair seções do texto (isso pode variar dependendo da resposta da IA)
      const sections = text.split(/\d+\.\s+/);
      
      // Tentar parsear cada seção
      if (sections.length > 1) {
        analysis.summary = sections[1]?.split('\n')[0] || '';
        
        // Extrair pontos fortes, melhorias e recomendações
        const fullText = sections.join(' ');
        
        // Esta é uma implementação simplificada
        // A resposta real da IA pode precisar de parsing mais sofisticado
        analysis.strengths = this.extractBulletPoints(fullText, 'PONTOS FORTES');
        analysis.improvements = this.extractBulletPoints(fullText, 'ÁREAS DE MELHORIA');
        analysis.recommendations = this.extractBulletPoints(fullText, 'RECOMENDAÇÕES');
      }
    } catch (error) {
      console.error('Erro ao parsear resposta:', error);
    }

    return analysis;
  }

  /**
   * Extrai bullet points de uma seção específica
   * @param {string} text - Texto completo
   * @param {string} section - Nome da seção
   * @returns {Array} Lista de pontos
   */
  extractBulletPoints(text, section) {
    const points = [];
    const sectionRegex = new RegExp(`${section}[:\\s]+([\\s\\S]*?)(?=\\n\\n|$)`, 'i');
    const match = text.match(sectionRegex);
    
    if (match && match[1]) {
      const lines = match[1].split('\n');
      lines.forEach(line => {
        const cleaned = line.trim().replace(/^[-*•]\s*/, '');
        if (cleaned.length > 10) {
          points.push(cleaned);
        }
      });
    }
    
    return points;
  }

  /**
   * Obtém análise mock para quando a API não está configurada
   * @param {Object} userData - Dados do usuário
   * @returns {Object} Análise mock
   */
  getMockAnalysis(userData) {
    const { totalEmissions = 0, transportEmissions = 0, energyEmissions = 0 } = userData;
    
    const mainCategory = transportEmissions > energyEmissions ? 'transporte' : 'energia';
    const mainPercentage = ((Math.max(transportEmissions, energyEmissions) / totalEmissions) * 100).toFixed(0);

    return {
      summary: `Sua pegada de carbono está em ${totalEmissions.toFixed(2)} kg CO₂. A maior parte vem de ${mainCategory} (${mainPercentage}%). Há oportunidades significativas de redução!`,
      
      strengths: [
        'Você está monitorando ativamente suas emissões de carbono',
        'Demonstra consciência ambiental ao usar este aplicativo'
      ],
      
      improvements: [
        `${mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)} representa sua maior fonte de emissões`,
        'Potencial de redução de 20-30% com pequenas mudanças de hábitos',
        'Considere alternativas mais sustentáveis no dia a dia'
      ],
      
      recommendations: [
        {
          action: transportEmissions > energyEmissions 
            ? 'Prefira transporte público ou bicicleta para trajetos curtos' 
            : 'Desligue aparelhos eletrônicos quando não estiver usando',
          impact: 'Alta',
          reduction: '15-25%'
        },
        {
          action: 'Opte por lâmpadas LED em toda a casa',
          impact: 'Média',
          reduction: '8-12%'
        },
        {
          action: 'Reduza o consumo de carne para 2-3x por semana',
          impact: 'Alta',
          reduction: '10-20%'
        },
        {
          action: 'Use sacolas reutilizáveis e evite plástico descartável',
          impact: 'Baixa',
          reduction: '3-5%'
        },
        {
          action: 'Configure ar condicionado para 23-24°C',
          impact: 'Média',
          reduction: '5-10%'
        }
      ],
      
      goal: `Meta sugerida: Reduzir ${(totalEmissions * 0.15).toFixed(2)} kg CO₂ (15%) no próximo mês`,
      
      message: '💡 Esta é uma análise básica. Configure sua API Key do Gemini para análises personalizadas com IA!'
    };
  }

  /**
   * Gera dicas personalizadas baseadas em categoria específica
   * @param {string} category - Categoria (transport, energy, gas)
   * @param {number} emission - Emissão da categoria
   * @returns {Object} Dicas específicas
   */
  async getCategoryTips(category, emission) {
    if (!this.isConfigured()) {
      return {
        success: false,
        tips: this.getMockCategoryTips(category, emission)
      };
    }

    try {
      const prompt = `
Forneça 5 dicas práticas e específicas para reduzir emissões de CO₂ na categoria: ${category}.
Emissão atual: ${emission.toFixed(2)} kg CO₂

Para cada dica, inclua:
1. Ação específica
2. Estimativa de redução de CO₂
3. Nível de dificuldade (Fácil/Médio/Difícil)

Seja prático e direto ao ponto.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        tips: text
      };
    } catch (error) {
      console.error('Erro ao obter dicas:', error);
      return {
        success: false,
        tips: this.getMockCategoryTips(category, emission)
      };
    }
  }

  /**
   * Dicas mock por categoria
   * @param {string} category - Categoria
   * @param {number} emission - Emissão
   * @returns {Array} Lista de dicas
   */
  getMockCategoryTips(category, emission) {
    const tips = {
      transport: [
        'Use transporte público em vez do carro particular',
        'Considere bicicleta ou caminhada para distâncias curtas',
        'Faça carona solidária (carpool) com colegas',
        'Mantenha o carro bem regulado para melhor eficiência',
        'Planeje rotas para evitar congestionamentos'
      ],
      energy: [
        'Troque todas as lâmpadas por LED',
        'Desligue aparelhos da tomada quando não usar',
        'Use ventilador em vez de ar condicionado quando possível',
        'Configure geladeira para temperatura adequada (3-4°C)',
        'Lave roupas com água fria'
      ],
      gas: [
        'Reduza o tempo do banho quente',
        'Use panela de pressão para cozinhar',
        'Mantenha tampas nas panelas ao cozinhar',
        'Verifique vazamentos no fogão regularmente',
        'Cozinhe várias refeições de uma vez'
      ]
    };

    return tips[category] || [];
  }
}

export default new GeminiService();

