# 🌱 Calculadora de Pegada de Carbono

Aplicativo móvel desenvolvido com React Native e Expo para calcular e monitorar a pegada de carbono pessoal baseado em hábitos diários.

## 🎉 **NOVIDADES! Versão 2.0**

🏆 **Ranking Global** - Compete com outros usuários e veja quem está reduzindo mais CO₂!

🤖 **Análise por IA** - Receba insights personalizados sobre seus hábitos usando Google Gemini Pro!

🌳 **Cálculo de Árvores** - Descubra quantas árvores você precisa plantar para compensar suas emissões!

⭐ **Sistema de Pontos** - Ganhe pontos reduzindo suas emissões e suba no ranking!

👉 **[Veja o Guia Rápido das Novas Features](./GUIA_RAPIDO_NOVAS_FEATURES.md)**

## 📋 Requisitos Implementados

### Requisitos Funcionais (RF)
- ✅ **RF01**: Registro de consumo diário (transporte, energia, alimentação e gás)
- ✅ **RF02**: Cálculo automático de pegada de carbono usando fatores IPCC
- ✅ **RF03**: Relatórios comparativos mensais com gráficos
- ✅ **RF04**: Sugestões de dicas personalizadas para redução de emissões
- ✅ **RF05**: Exportação de dados em PDF/CSV

### Requisitos Não-Funcionais (RNF)
- ✅ **RNF01**: Tempo de resposta < 2s para cálculos locais
- ✅ **RNF02**: Alta disponibilidade (armazenamento local + Firebase)
- ✅ **RNF03**: Compatibilidade com Android 10+ e iOS 14+ (via Expo)
- ✅ **RNF04**: Armazenamento seguro com Firebase Auth
- ✅ **RNF05**: Interface acessível e responsiva

### Regras de Negócio (RN)
- ✅ **RN01**: Fatores de emissão seguindo diretrizes IPCC 2023
- ✅ **RN02**: Verificação de e-mail obrigatória
- ✅ **RN03**: Dados comparativos anonimizados
- ✅ **RN04**: Cálculos arredondados para 2 casas decimais
- ✅ **RN05**: Histórico mantido por 24 meses

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **Firebase** - Autenticação e armazenamento
- **AsyncStorage** - Armazenamento local
- **React Navigation** - Navegação entre telas
- **React Native Chart Kit** - Gráficos e visualizações
- **Expo Print & Sharing** - Exportação de relatórios
- **Google Gemini AI** - Análise de hábitos por IA (novo!)
- **Firestore** - Banco de dados para ranking e pontos

## 📊 Fatores de Emissão (IPCC)

### Transporte Terrestre (kg CO₂/km)
- Carro pequeno (até 1.4L) - Gasolina: 0,192
- Carro médio (1.5 a 2.0L) - Gasolina: 0,232
- Carro grande (>2.0L) - Gasolina: 0,250
- Carro - Diesel: 0,250
- Ônibus urbano - Diesel: 0,105
- Ônibus rodoviário - Diesel: 0,060

### Transporte Aéreo (kg CO₂/km)
- Voo nacional (ida e volta): 0,150
- Voo internacional (ida e volta): 0,200

### Energia Elétrica (kg CO₂/kWh)
- Média Brasil: 0,084

### Gás (kg CO₂/unidade)
- Gás de cozinha (GLP): 2,983 kg CO₂/kg
- Gás natural (GN): 2,000 kg CO₂/m³

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI
- Conta Firebase (para autenticação)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd mobile-tcc
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Firebase**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - **Ative a autenticação por e-mail/senha**
   - **Habilite o Firestore Database** (necessário para ranking e pontos)
   - Configure as regras de segurança do Firestore
   - Copie as credenciais do Firebase
   - Adicione suas credenciais no arquivo `src/config/firebase.js`

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

   **📋 IMPORTANTE:** Para usar o sistema de ranking e pontos, você precisa configurar o Firestore. Veja o guia completo em [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)

4. **Configure o Google Gemini AI (Opcional)**
   - Para análises personalizadas por IA, obtenha uma API Key
   - Acesse: [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Configure no app através da tela de Perfil
   - Veja instruções completas em [GEMINI_SETUP.md](./GEMINI_SETUP.md)
   - **Nota**: O app funciona normalmente sem a API Key, com análises básicas

5. **Inicie o aplicativo**
```bash
npm start
```

6. **Execute no dispositivo**
   - Para Android: `npm run android`
   - Para iOS: `npm run ios`
   - Ou escaneie o QR Code com o app Expo Go

## 📱 Funcionalidades

### Tela Inicial (Home)
- Visualização das emissões do dia atual
- Resumo mensal de emissões
- Cards com breakdown por categoria
- Acesso rápido para registro e relatórios

### Registro de Consumo
- Formulário intuitivo para registro diário
- Categorias:
  - Transporte Terrestre (com seleção de tipo de veículo)
  - Transporte Aéreo (nacional/internacional)
  - Energia Elétrica (kWh)
  - Gás (GLP/GN)
- Cálculo automático de emissões
- Validação de dados
- **Sistema de pontos integrado** 🆕

### Relatórios
- Gráfico de linha: evolução mensal (últimos 6 meses)
- Gráfico de pizza: distribuição por categoria
- Resumo estatístico detalhado
- Exportação em PDF e CSV

### Dicas Personalizadas
- Dicas baseadas no padrão de consumo
- Categorização por impacto (Muito Alta, Alta, Média, Baixa)
- Organização por categoria
- Sugestões práticas e acionáveis

### 🏆 Ranking (NOVO!)
- Ranking global de usuários
- Filtros por período (Geral, Semanal, Diário)
- Visualização da sua posição
- Medalhas para top 3
- Sistema de pontos gamificado
- Incentivo à competição amigável pela sustentabilidade

### 👤 Perfil (NOVO!)
- **Estatísticas Pessoais**
  - Total de emissões mensais
  - Pontos acumulados
  - Breakdown por categoria
  
- **🤖 Análise de Hábitos por IA**
  - Análise personalizada com Google Gemini Pro
  - Identificação de pontos fortes
  - Sugestões de áreas de melhoria
  - Recomendações práticas específicas
  - Metas personalizadas
  
- **🌳 Cálculo de Árvores**
  - Quantas árvores plantar para compensar emissões
  - Mensagens motivacionais
  - Informações educativas sobre impacto
  
- **Configurações**
  - Gerenciar API Key do Gemini
  - Logout

### ⭐ Sistema de Pontos (NOVO!)
- Ganhe pontos reduzindo suas emissões
- 10 pontos por kg de CO₂ reduzido
- Penalização por aumento de emissões
- Pontos diários, semanais e totais
- Integrado ao sistema de ranking

## 🏗️ Estrutura do Projeto

```
mobile-tcc/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── EmissionCard.js
│   │   ├── Input.js
│   │   └── TipCard.js
│   ├── config/           # Configurações
│   │   └── firebase.js
│   ├── constants/        # Constantes e dados estáticos
│   │   ├── colors.js
│   │   └── emissionFactors.js
│   ├── contexts/         # Contextos React
│   │   └── AuthContext.js
│   ├── navigation/       # Configuração de navegação
│   │   └── AppNavigator.js
│   ├── screens/          # Telas do aplicativo
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── ProfileScreen.js      # 🆕 Perfil com IA
│   │   ├── RankingScreen.js       # 🆕 Ranking de usuários
│   │   ├── RegisterScreen.js
│   │   ├── ReportsScreen.js
│   │   ├── SignupScreen.js
│   │   └── TipsScreen.js
│   └── services/         # Serviços e lógica de negócio
│       ├── carbonCalculator.js
│       ├── geminiService.js       # 🆕 Integração com Gemini AI
│       ├── pointsService.js       # 🆕 Sistema de pontos
│       ├── storageService.js
│       ├── tipsService.js
│       └── treeService.js         # 🆕 Cálculo de árvores
├── App.js                         # Componente raiz
├── app.json                       # Configuração do Expo
├── package.json                   # Dependências
├── README.md                      # Este arquivo
├── NOVAS_FUNCIONALIDADES.md       # 🆕 Documentação detalhada
├── FIRESTORE_SETUP.md             # 🆕 Setup do Firestore
├── GEMINI_SETUP.md                # 🆕 Setup da IA
└── GUIA_RAPIDO_NOVAS_FEATURES.md  # 🆕 Guia rápido
```

## 🎨 Design e UX

- **Material Design**: Interface moderna e intuitiva
- **Cores**: Esquema verde (sustentabilidade) com acentos laranja
- **Acessibilidade**: Contraste adequado e tamanhos de fonte legíveis
- **Responsividade**: Adaptável a diferentes tamanhos de tela
- **Feedback Visual**: Loading states e confirmações claras

## 🔐 Segurança

- Autenticação via Firebase Auth
- Verificação de e-mail obrigatória
- Armazenamento local criptografado (AsyncStorage)
- Dados pessoais não são compartilhados
- Conformidade com LGPD

## 📈 Próximas Melhorias

- [ ] Modo offline completo
- [ ] Notificações push para lembretes
- [ ] Badges e conquistas adicionais
- [ ] Comparação com média regional/nacional
- [ ] Integração com APIs de transporte público
- [ ] Modo escuro (dark mode)
- [ ] Suporte a múltiplos idiomas
- [ ] Sistema de amigos e compartilhamento
- [ ] Desafios semanais/mensais
- [ ] Histórico detalhado de pontos

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos (TCC).

## 👥 Autores

Desenvolvido como Trabalho de Conclusão de Curso.

## 📞 Suporte

Para dúvidas ou suporte, abra uma issue no repositório.

---

**Faça sua parte pelo planeta! 🌍**
