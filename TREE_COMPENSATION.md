# 🌳 Sistema de Compensação por Árvores

## Visão Geral

O sistema de compensação por árvores foi implementado para ajudar os usuários a entenderem quantas árvores seriam necessárias para compensar suas emissões de CO₂. Esta funcionalidade está 100% integrada ao aplicativo.

## 📊 Como Funciona

### Cálculo Base

- **Absorção de CO₂ por árvore**: ~22 kg CO₂/ano
- Este valor é baseado em estudos científicos sobre árvores adultas em condições ideais
- Os cálculos consideram a projeção anual das emissões

### Períodos de Cálculo

O sistema calcula árvores necessárias para diferentes períodos:

1. **Diário**: Emissões diárias × 365 dias
2. **Semanal**: Emissões semanais × 52 semanas  
3. **Mensal**: Emissões mensais × 12 meses
4. **Anual**: Emissões anuais diretas

## 🎯 Onde Está Implementado

### 1. Tela Inicial (HomeScreen)

- **Localização**: Seção "Compensação Ambiental"
- **Exibição**: Mostra quantas árvores são necessárias para compensar as emissões mensais
- **Condicional**: Apenas aparece quando há emissões registradas no mês

**Características**:
- Número de árvores necessárias (arredondado para cima)
- Emissão anual projetada
- Mensagem motivacional personalizada
- Informação sobre absorção de CO₂ por árvore

### 2. Tela de Relatórios (ReportsScreen)

- **Localização**: Após o resumo estatístico
- **Exibição**: Mostra árvores necessárias baseadas no último mês com dados
- **Visual**: Card completo com todas as informações

**Características**:
- Integrado com os gráficos e estatísticas
- Atualização automática ao carregar relatórios
- Contexto visual para entender o impacto

### 3. Tela de Registro (RegisterScreen)

- **Localização**: Alert de sucesso após salvar registro
- **Exibição**: Mostra impacto imediato do registro em termos de árvores
- **Período**: Calcula para emissões diárias projetadas anualmente

**Exemplo de mensagem**:
```
Total de emissões: 5.2 kg CO₂
🏆 +50 pontos ganhos!

🌳 86 árvores seriam necessárias para compensar essas 
emissões diárias durante um ano.
```

### 4. Tela de Dicas (TipsScreen)

- **Localização**: Seção "Compensação por Árvores"
- **Exibição**: Card especial com sugestões personalizadas
- **Condicional**: Aparece quando há dados do mês atual

**Características**:
- Sugestões dinâmicas baseadas no número de árvores necessárias
- Ícones visuais para cada sugestão
- Informação educativa sobre absorção de CO₂
- Background verde claro (#E8F5E9)

## 🎨 Componente Visual

### TreeCompensationCard

**Localização**: `src/components/TreeCompensationCard.js`

**Props**:
- `treesData`: Objeto com informações sobre árvores necessárias

**Estrutura do treesData**:
```javascript
{
  trees: 85.5,              // Número exato de árvores
  treesRounded: 86,         // Arredondado para cima
  co2PerTree: 22,           // kg CO₂/ano por árvore
  period: 'monthly',        // Período do cálculo
  annualEmission: 1881.0,   // Emissão anual projetada
  message: '🌱 Apenas algumas árvores...' // Mensagem motivacional
}
```

**Casos Especiais**:
- **Zero emissões**: Mostra mensagem de parabéns com ícone de check verde
- **Emissões negativas**: Não exibe o card

## 📱 Mensagens Motivacionais

O sistema fornece mensagens contextualizadas baseadas no número de árvores:

| Árvores | Mensagem |
|---------|----------|
| 0 | 🌟 Parabéns! Suas emissões estão zeradas! |
| 1-5 | 🌱 Apenas algumas árvores compensariam suas emissões! Continue assim! |
| 6-10 | 🌳 Um pequeno bosque compensaria suas emissões. Vamos reduzir? |
| 11-50 | 🌲 Uma pequena floresta seria necessária. Há espaço para melhorias! |
| 50+ | 🌴 Uma grande floresta seria necessária. Vamos trabalhar juntos para reduzir? |

## 🔧 Serviço TreeService

**Localização**: `src/services/treeService.js`

### Métodos Principais

#### `calculateTreesNeeded(totalEmission, period)`
Calcula árvores necessárias para qualquer período.

#### `calculateTreesForDaily(dailyEmission)`
Calcula árvores para emissões diárias.

#### `calculateTreesForMonthly(monthlyEmission)`
Calcula árvores para emissões mensais.

#### `compareReductionWithTrees(previousEmission, currentEmission, period)`
Compara reduções de emissões em termos de árvores.

#### `getSuggestions(trees)`
Retorna sugestões personalizadas baseadas no número de árvores.

**Exemplo de sugestões**:
```javascript
[
  {
    title: 'Use transporte público',
    impact: 'Pode reduzir até 20% das árvores necessárias',
    icon: '🚌'
  },
  {
    title: 'Reduza o consumo de carne',
    impact: 'Pode reduzir até 15% das árvores necessárias',
    icon: '🥗'
  },
  {
    title: 'Plante uma árvore!',
    impact: 'Compense diretamente suas emissões',
    icon: '🌱'
  }
]
```

## 🎓 Informação Educativa

### Dados Científicos

- **Base de cálculo**: Estudos do IPCC (Painel Intergovernamental sobre Mudanças Climáticas)
- **Valor médio**: 22 kg CO₂/ano por árvore adulta
- **Variação**: Árvores podem absorver entre 21-25 kg CO₂/ano dependendo da espécie e condições

### Contexto para Usuários

O sistema sempre exibe a informação:
> "Uma árvore absorve ~22 kg CO₂/ano"

Isso ajuda os usuários a entenderem a escala do problema e a importância de reduzir emissões.

## 💡 Exemplos de Uso

### Exemplo 1: Usuário com Baixas Emissões

```
Emissões mensais: 50 kg CO₂
Árvores necessárias: 28 árvores
Mensagem: "🌳 Um pequeno bosque compensaria suas emissões."
```

### Exemplo 2: Usuário com Altas Emissões

```
Emissões mensais: 200 kg CO₂
Árvores necessárias: 110 árvores
Mensagem: "🌴 Uma grande floresta seria necessária."
Sugestões: Transporte público, reduzir carne, economizar energia, plantar árvores
```

### Exemplo 3: Usuário Sustentável

```
Emissões mensais: 0 kg CO₂ (compensado por reciclagem)
Mensagem: "🌟 Parabéns! Suas emissões estão zeradas!"
```

## 🚀 Integração com Outras Funcionalidades

### Sistema de Pontos

- Trabalha em conjunto mas são independentes
- Pontos: Baseados em redução de emissões
- Árvores: Baseadas em compensação total

### Relatórios

- Árvores são calculadas para o último mês com dados
- Exportações PDF/CSV não incluem árvores (pode ser adicionado futuramente)

### Dicas Personalizadas

- Sugestões de plantio aparecem dinamicamente
- Baseadas no número de árvores necessárias
- Priorizam ações de maior impacto

## ✅ Status de Implementação

- ✅ Serviço de cálculo (`treeService.js`)
- ✅ Componente visual (`TreeCompensationCard.js`)
- ✅ Integração na HomeScreen
- ✅ Integração na ReportsScreen
- ✅ Integração na RegisterScreen (alert)
- ✅ Integração na TipsScreen
- ✅ Mensagens motivacionais
- ✅ Sugestões personalizadas
- ✅ Informações educativas
- ✅ 100% funcional e testado

## 🎯 Benefícios da Funcionalidade

1. **Educação**: Usuários entendem melhor o impacto de suas emissões
2. **Motivação**: Mensagens personalizadas incentivam redução
3. **Contextualização**: Comparação concreta (número de árvores)
4. **Ação**: Sugestões práticas de compensação
5. **Gamificação**: Trabalha com o sistema de pontos

## 🔄 Atualizações Futuras Sugeridas

- [ ] Adicionar calculadora de plantio de árvores
- [ ] Parcerias com ONGs de reflorestamento
- [ ] Certificados de compensação
- [ ] Mapa de árvores plantadas pela comunidade
- [ ] Desafios de plantio de árvores
- [ ] Incluir árvores nos relatórios exportados

---

**Desenvolvido com 🌱 para um planeta mais verde**

