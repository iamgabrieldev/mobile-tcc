# 🎉 Novas Funcionalidades - Sistema de Ranking e Análise por IA

Este documento descreve as novas funcionalidades adicionadas ao aplicativo de calculadora de pegada de carbono.

## 📋 Índice

1. [Sistema de Ranking](#-sistema-de-ranking)
2. [Análise de Hábitos por IA](#-análise-de-hábitos-por-ia)
3. [Cálculo de Árvores para Compensação](#-cálculo-de-árvores-para-compensação)
4. [Sistema de Pontos](#-sistema-de-pontos)
5. [Perfil do Usuário](#-perfil-do-usuário)

---

## 🏆 Sistema de Ranking

### Descrição
Um ranking global de todos os usuários da plataforma, incentivando a competição amigável pela sustentabilidade.

### Funcionalidades

#### Visualização de Rankings
- **Ranking Geral**: Pontuação acumulada desde o início
- **Ranking Semanal**: Pontuação da última semana
- **Ranking Diário**: Pontuação do dia atual

#### Posição do Usuário
- Mostra sua posição atual no ranking
- Exibe seus pontos totais
- Destaca você na lista quando aparece

#### Medalhas
- 🥇 **1º Lugar**: Medalha de Ouro
- 🥈 **2º Lugar**: Medalha de Prata
- 🥉 **3º Lugar**: Medalha de Bronze

#### Como Funciona
1. Cada usuário recebe pontos baseados na redução de emissões
2. Quanto maior a redução, mais pontos você ganha
3. Os rankings são atualizados em tempo real
4. Você pode comparar seu desempenho com outros usuários

### Como Acessar
- Toque na aba "Ranking" na navegação inferior
- Puxe para baixo para atualizar os dados

---

## 🤖 Análise de Hábitos por IA

### Descrição
Análise personalizada dos seus hábitos de consumo usando Google Gemini Pro AI, fornecendo insights específicos e recomendações personalizadas.

### Funcionalidades

#### Análise Completa
- **Resumo Geral**: Avaliação do seu perfil de emissões
- **Pontos Fortes**: O que você está fazendo bem
- **Áreas de Melhoria**: Onde você pode melhorar
- **Recomendações Práticas**: Ações específicas para você
- **Meta Personalizada**: Objetivos realistas baseados no seu perfil

#### Insights Personalizados
- Análise comparativa com médias nacionais/globais
- Identificação de padrões nos seus hábitos
- Priorização de ações por impacto
- Estimativas de redução para cada recomendação

#### Modo Fallback
Se você não configurar a API Key do Gemini:
- Análise básica ainda disponível
- Recomendações genéricas mas úteis
- Funcionalidade não interrompida

### Como Usar
1. Vá até a aba "Perfil"
2. Toque em "Analisar Meus Hábitos"
3. Aguarde alguns segundos enquanto a IA processa
4. Visualize sua análise completa e personalizada
5. Toque no ícone de refresh para uma nova análise

### Configuração
Para análises personalizadas, configure sua API Key do Gemini:
- Veja instruções completas em [GEMINI_SETUP.md](./GEMINI_SETUP.md)

---

## 🌳 Cálculo de Árvores para Compensação

### Descrição
Mostra quantas árvores você precisaria plantar para compensar suas emissões de CO₂.

### Funcionalidades

#### Cálculo Preciso
- Baseado em dados científicos (22 kg CO₂/ano por árvore)
- Projeção anual a partir das suas emissões mensais
- Visualização clara e motivadora

#### Contexto e Educação
- Mensagens motivacionais baseadas no resultado
- Comparação de reduções com plantio de árvores
- Sugestões de ações equivalentes

#### Exemplos de Mensagens
- 🌟 "Apenas algumas árvores compensariam suas emissões!"
- 🌳 "Um pequeno bosque compensaria suas emissões"
- 🌴 "Uma grande floresta seria necessária. Vamos trabalhar juntos?"

### Como Visualizar
- Aparece automaticamente na sua tela de Perfil
- Atualizado com base nas suas emissões do último mês
- Incluído nas análises de hábitos

---

## ⭐ Sistema de Pontos

### Descrição
Sistema gamificado que recompensa reduções de emissões de CO₂.

### Como Ganhar Pontos

#### Por Redução de Emissões
- **10 pontos** por cada kg de CO₂ reduzido
- Comparado com seu registro anterior
- Quanto mais reduzir, mais pontos ganha

#### Penalização por Aumento
- **-5 pontos** por cada kg de CO₂ aumentado
- Metade da pontuação da redução
- Incentiva manter as reduções

#### Participação
- **+1 ponto** mesmo sem mudança
- Incentiva o registro contínuo
- Toda participação conta

### Exemplo de Cálculo
```
Registro Anterior: 50 kg CO₂
Registro Atual: 40 kg CO₂
Redução: 10 kg CO₂
Pontos Ganhos: 10 × 10 = 100 pontos! 🎉
```

### Tipos de Pontos
- **Pontos Totais**: Acumulado desde o início
- **Pontos Semanais**: Resetam toda semana
- **Pontos Diários**: Resetam todo dia

---

## 👤 Perfil do Usuário

### Descrição
Tela completa dedicada ao seu perfil, estatísticas e análises.

### Funcionalidades

#### Estatísticas Pessoais
- Emissões totais do mês
- Pontos acumulados
- Distribuição por categoria (transporte, energia, gás)

#### Compensação com Árvores
- Cálculo de árvores necessárias
- Mensagens motivacionais
- Informações educativas

#### Análise por IA
- Botão para análise de hábitos
- Visualização de insights
- Recomendações práticas

#### Configurações
- Gerenciar API Key do Gemini
- Opções de conta
- Logout

### Como Acessar
- Toque na aba "Perfil" na navegação inferior
- Puxe para baixo para atualizar os dados

---

## 🔧 Aspectos Técnicos

### Novos Serviços Criados

1. **pointsService.js**
   - Gerenciamento de pontos
   - Cálculo de ranking
   - Histórico de pontos

2. **geminiService.js**
   - Integração com Gemini AI
   - Análise de hábitos
   - Geração de insights

3. **treeService.js**
   - Cálculo de árvores necessárias
   - Comparações e equivalências
   - Mensagens motivacionais

### Novas Telas Criadas

1. **RankingScreen.js**
   - Lista de usuários ranqueados
   - Filtros por período
   - Posição do usuário

2. **ProfileScreen.js**
   - Perfil completo
   - Análise de hábitos
   - Estatísticas e configurações

### Integrações

#### Firebase Firestore
Novas coleções:
- `userPoints`: Pontos de cada usuário
- `pointsHistory`: Histórico de pontos
- `emissions`: Registros de emissões (atualizado)

#### Google Gemini AI
- Modelo: `gemini-pro`
- Análise de texto generativo
- Recomendações personalizadas

---

## 📱 Navegação Atualizada

O app agora possui **6 telas** na navegação principal:

1. **Início** (Home) - Visão geral e dashboard
2. **Registrar** - Registro de consumo diário
3. **Relatórios** - Gráficos e análises
4. **Dicas** - Dicas de sustentabilidade
5. **🆕 Ranking** - Competição amigável
6. **🆕 Perfil** - Seu perfil e análises por IA

---

## 🎯 Próximos Passos

### Para Começar a Usar
1. ✅ Registre suas emissões diárias
2. ✅ Acumule alguns registros
3. ✅ Configure a API Key do Gemini (opcional)
4. ✅ Visite a tela de Ranking para ver sua posição
5. ✅ Acesse seu Perfil para análise por IA
6. ✅ Trabalhe nas recomendações para ganhar mais pontos!

### Para Desenvolvedores
- Configure variáveis de ambiente para a API Key
- Customize as regras de pontuação
- Adicione mais tipos de análise
- Implemente notificações de conquistas
- Crie sistema de badges/troféus

---

## 🎊 Benefícios das Novas Funcionalidades

### Para Usuários
✨ **Gamificação**: Torna a redução de carbono divertida e competitiva
🤖 **IA Personalizada**: Recomendações específicas para você
🌱 **Educação**: Entenda o impacto em termos de árvores
📊 **Motivação**: Veja seu progresso e compare com outros
🏆 **Reconhecimento**: Destaque-se no ranking

### Para o Planeta
🌍 Mais engajamento = Mais redução de emissões
💚 Competição saudável pela sustentabilidade
🌿 Educação ambiental contínua
♻️ Mudança de hábitos a longo prazo

---

## 📚 Documentação Adicional

- [GEMINI_SETUP.md](./GEMINI_SETUP.md) - Como configurar o Gemini AI
- [README.md](./README.md) - Documentação geral do projeto
- [CONTRIBUINDO.md](./CONTRIBUINDO.md) - Como contribuir

---

## 💡 Dúvidas?

Se tiver dúvidas sobre as novas funcionalidades:
1. Consulte a documentação
2. Explore as telas no aplicativo
3. Entre em contato com o desenvolvedor

**Versão:** 1.0.0 com Ranking e IA
**Data:** Outubro 2025

---

🌱 **Juntos podemos fazer a diferença! Comece a usar e reduza sua pegada de carbono!** 🌍

