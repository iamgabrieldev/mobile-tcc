# 📚 Índice da Documentação

Bem-vindo ao projeto **Calculadora de Pegada de Carbono**! Este é seu guia para navegar pela documentação.

## 🎯 Por Onde Começar?

### Se você é novo:
1. 👉 [QUICKSTART.md](QUICKSTART.md) - **COMECE AQUI!** (5 min)
2. 📖 [README.md](README.md) - Visão geral completa
3. ⚙️ [SETUP.md](SETUP.md) - Configuração detalhada
4. 🚀 [NEXT_STEPS.md](NEXT_STEPS.md) - Próximos passos

### Se você já configurou:
- 🧪 [TESTING.md](TESTING.md) - Como testar o app
- 📊 [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Estrutura técnica
- 🤝 [CONTRIBUINDO.md](CONTRIBUINDO.md) - Como contribuir

## 📄 Documentos Principais

### Início Rápido
- **[QUICKSTART.md](QUICKSTART.md)** ⭐
  - Instalação em 5 minutos
  - Primeiro teste do app
  - Solução de problemas comuns
  - **Recomendado para:** Iniciantes

### Documentação Completa
- **[README.md](README.md)** 📖
  - Visão geral do projeto
  - Lista completa de features
  - Tecnologias utilizadas
  - Fatores de emissão IPCC
  - **Recomendado para:** Todos

### Configuração
- **[SETUP.md](SETUP.md)** ⚙️
  - Instalação do Node.js
  - Configuração do Firebase (passo a passo)
  - Configuração do Expo
  - Build para produção
  - Solução de problemas avançados
  - **Recomendado para:** Desenvolvedores

### Próximos Passos
- **[NEXT_STEPS.md](NEXT_STEPS.md)** 🚀
  - Comandos essenciais
  - Como personalizar o app
  - Preparação para apresentação TCC
  - Melhorias futuras
  - **Recomendado para:** Após configuração inicial

## 🔬 Documentação Técnica

### Visão Geral do Projeto
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** 📊
  - Arquitetura do sistema
  - Estrutura de pastas detalhada
  - Requisitos atendidos
  - Métricas e estatísticas
  - Design system
  - **Recomendado para:** Apresentação técnica do TCC

### Testes
- **[TESTING.md](TESTING.md)** 🧪
  - Testes manuais completos
  - Casos de teste com dados
  - Checklist de regressão
  - Testes de performance
  - **Recomendado para:** QA e validação

## 🤝 Contribuição

### Como Contribuir
- **[CONTRIBUINDO.md](CONTRIBUINDO.md)** 🤝
  - Reportar bugs
  - Sugerir melhorias
  - Padrões de código
  - Fluxo de Pull Request
  - **Recomendado para:** Contribuidores

### Histórico
- **[CHANGELOG.md](CHANGELOG.md)** 📝
  - Versões lançadas
  - Mudanças por versão
  - Recursos planejados
  - **Recomendado para:** Acompanhamento de versões

### Licença
- **[LICENSE.md](LICENSE.md)** ⚖️
  - Termos de uso
  - Isenção de responsabilidade
  - Nota acadêmica
  - **Recomendado para:** Aspectos legais

## 🚀 Deploy e Publicação

### Deploy na Play Store
- **[DEPLOY_PLAYSTORE.md](DEPLOY_PLAYSTORE.md)** 🏪
  - Passo a passo completo
  - Preparação de assets
  - Configuração Play Console
  - Build com EAS
  - Upload e publicação
  - **Recomendado para:** Publicar o app

## 📂 Estrutura de Código

### Principais Diretórios

```
src/
├── components/         # Componentes reutilizáveis
├── screens/           # Telas do app
├── services/          # Lógica de negócio
├── constants/         # Dados estáticos
├── contexts/          # React Contexts
├── navigation/        # Rotas
├── config/            # Configurações
└── utils/             # Funções auxiliares
```

### Arquivos Importantes

#### Componentes (`src/components/`)
- `Button.js` - Botão customizado
- `Card.js` - Container de card
- `EmissionCard.js` - Card de emissão
- `Input.js` - Input de texto
- `TipCard.js` - Card de dica

#### Telas (`src/screens/`)
- `LoginScreen.js` - Tela de login
- `SignupScreen.js` - Cadastro
- `HomeScreen.js` - Tela principal
- `RegisterScreen.js` - Registro de consumo
- `ReportsScreen.js` - Relatórios
- `TipsScreen.js` - Dicas

#### Serviços (`src/services/`)
- `carbonCalculator.js` - Cálculos de CO₂
- `storageService.js` - Armazenamento
- `tipsService.js` - Sistema de dicas

#### Constantes (`src/constants/`)
- `emissionFactors.js` - Fatores IPCC
- `colors.js` - Paleta de cores

## 🎓 Para o TCC

### Documentação Essencial
1. [README.md](README.md) - Introdução no trabalho
2. [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Detalhes técnicos
3. [TESTING.md](TESTING.md) - Validação e testes

### Para a Apresentação
1. [QUICKSTART.md](QUICKSTART.md) - Demonstração rápida
2. [NEXT_STEPS.md](NEXT_STEPS.md) - Script de demo

### Para a Banca
- Arquitetura: [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
- Requisitos: [README.md](README.md)
- Testes: [TESTING.md](TESTING.md)
- Código: Arquivos em `src/`

## 📱 Referência Rápida

### Comandos Essenciais
```bash
npm install           # Instalar dependências
npm start            # Executar app
npm start --tunnel   # Modo tunnel
npm run android      # Android (emulador)
npm run ios          # iOS (simulador)
```

### Arquivos de Configuração
- `package.json` - Dependências
- `app.json` - Configuração Expo
- `babel.config.js` - Babel
- `src/config/firebase.js` - Firebase (criar)

### Dados de Teste
- Ver `src/utils/testData.js`

## 🔍 Busca Rápida

### Quero...

**...instalar o app**
→ [QUICKSTART.md](QUICKSTART.md)

**...configurar Firebase**
→ [SETUP.md](SETUP.md) seção 3

**...entender a arquitetura**
→ [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)

**...adicionar nova feature**
→ [CONTRIBUINDO.md](CONTRIBUINDO.md)

**...testar o app**
→ [TESTING.md](TESTING.md)

**...mudar cores**
→ `src/constants/colors.js`

**...adicionar fator de emissão**
→ `src/constants/emissionFactors.js`

**...entender cálculos**
→ `src/services/carbonCalculator.js`

**...preparar apresentação TCC**
→ [NEXT_STEPS.md](NEXT_STEPS.md) seção "Para Apresentação do TCC"

## 📞 Suporte

### Problemas Técnicos
1. Consulte [SETUP.md](SETUP.md) - Solução de Problemas
2. Verifique [QUICKSTART.md](QUICKSTART.md) - Problemas Comuns
3. Abra uma Issue no GitHub

### Dúvidas sobre Código
1. Leia [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
2. Veja comentários no código
3. Consulte documentação oficial:
   - [Expo Docs](https://docs.expo.dev/)
   - [React Native](https://reactnative.dev/)

### Contribuir
1. Leia [CONTRIBUINDO.md](CONTRIBUINDO.md)
2. Siga os padrões de código
3. Abra Pull Request

## ✅ Checklist de Início

- [ ] Li o [QUICKSTART.md](QUICKSTART.md)
- [ ] Instalei Node.js e npm
- [ ] Executei `npm install`
- [ ] Configurei Firebase
- [ ] Executei `npm start`
- [ ] Testei no Expo Go
- [ ] Li o [README.md](README.md)
- [ ] Explorei o código

## 🎯 Próximo Passo

**Ainda não começou?**
👉 Abra [QUICKSTART.md](QUICKSTART.md) agora!

**Já configurou tudo?**
👉 Veja [NEXT_STEPS.md](NEXT_STEPS.md) para personalizar!

**Preparando TCC?**
👉 Leia [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) para detalhes técnicos!

---

**Boa sorte com seu projeto! 🌱**

*Última atualização: Outubro 2024*
