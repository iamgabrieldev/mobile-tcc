# 🛠️ Guia de Configuração Detalhado

Este guia vai te ajudar a configurar o projeto passo a passo.

## 1. Instalação do Node.js e npm

### Windows
1. Baixe o Node.js LTS de https://nodejs.org/
2. Execute o instalador
3. Verifique a instalação:
```bash
node --version
npm --version
```

### macOS
```bash
brew install node
```

### Linux
```bash
sudo apt update
sudo apt install nodejs npm
```

## 2. Instalação do Expo CLI

```bash
npm install -g expo-cli
```

## 3. Configuração do Firebase

### 3.1. Criar Projeto Firebase
1. Acesse https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Digite um nome para o projeto (ex: "calculadora-carbono")
4. Desabilite o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 3.2. Ativar Autenticação por E-mail
1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Clique na aba "Sign-in method"
4. Ative "E-mail/senha"
5. Salve as alterações

### 3.3. Obter Credenciais
1. No menu lateral, clique no ícone de engrenagem ⚙️
2. Clique em "Configurações do projeto"
3. Role até "Seus aplicativos"
4. Clique no ícone Web `</>`
5. Registre um apelido (ex: "web-app")
6. Não marque "Firebase Hosting"
7. Clique em "Registrar app"
8. Copie as credenciais do `firebaseConfig`

### 3.4. Configurar no Projeto
1. Navegue até `src/config/`
2. Renomeie `firebase.example.js` para `firebase.js`
3. Cole suas credenciais:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

## 4. Instalação das Dependências

No diretório do projeto:

```bash
npm install
```

Ou se preferir yarn:

```bash
yarn install
```

## 5. Executar o Projeto

### Modo de Desenvolvimento
```bash
npm start
```

Isso abrirá o Expo Dev Tools no navegador.

### Executar no Android
```bash
npm run android
```

**Requisitos:**
- Android Studio instalado
- Emulador Android configurado ou dispositivo físico conectado

### Executar no iOS (apenas macOS)
```bash
npm run ios
```

**Requisitos:**
- Xcode instalado
- Simulador iOS ou dispositivo físico conectado

### Executar com Expo Go (Recomendado para iniciantes)
1. Instale o app "Expo Go" no seu smartphone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Execute `npm start`
3. Escaneie o QR Code com o app Expo Go

## 6. Criar Assets (Ícones e Splash Screen)

### Opção 1: Assets Temporários
O Expo gerará assets padrão automaticamente.

### Opção 2: Assets Personalizados
1. Crie ou baixe imagens:
   - `icon.png` (1024x1024px)
   - `splash.png` (1242x2436px)
   - `adaptive-icon.png` (1024x1024px)

2. Coloque na pasta `assets/`

3. O Expo redimensionará automaticamente

### Opção 3: Usar Ferramenta Online
- https://appicon.co/
- https://makeappicon.com/

## 7. Solução de Problemas Comuns

### Erro: "Unable to resolve module"
```bash
# Limpar cache
npm start -- --reset-cache

# Ou reinstalar
rm -rf node_modules
npm install
```

### Erro: Firebase não inicializa
- Verifique se renomeou o arquivo para `firebase.js`
- Confirme que as credenciais estão corretas
- Verifique a conexão com internet

### Erro: "Metro Bundler error"
```bash
# Windows
taskkill /F /IM node.exe

# macOS/Linux
killall node

# Reiniciar
npm start
```

### Erro: Picker não funciona
O Picker foi movido para um pacote separado, já incluído no projeto:
```bash
npm install @react-native-picker/picker
```

### App não conecta no Expo Go
- Certifique-se de estar na mesma rede WiFi
- Desabilite VPN
- Tente usar o modo Tunnel: `npm start --tunnel`

## 8. Build para Produção

### Android (APK)
```bash
expo build:android
```

### iOS (IPA)
```bash
expo build:ios
```

**Nota:** Builds requerem conta Expo (gratuita)

### EAS Build (Recomendado - Novo sistema)
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## 9. Configurações Opcionais

### Personalizar Cores
Edite `src/constants/colors.js`

### Adicionar Novos Fatores de Emissão
Edite `src/constants/emissionFactors.js`

### Modificar Regras de Negócio
- Cálculos: `src/services/carbonCalculator.js`
- Armazenamento: `src/services/storageService.js`
- Dicas: `src/services/tipsService.js`

## 10. Testes Recomendados

### Teste 1: Registro de Usuário
1. Criar conta com e-mail válido
2. Verificar recebimento de e-mail de verificação
3. Login após verificação

### Teste 2: Registro de Consumo
1. Preencher formulário com dados válidos
2. Verificar cálculo correto
3. Confirmar salvamento

### Teste 3: Relatórios
1. Registrar dados de vários dias
2. Verificar gráficos
3. Exportar PDF/CSV

### Teste 4: Dicas Personalizadas
1. Registrar consumos variados
2. Verificar dicas na tela de Dicas
3. Confirmar personalização

## 11. Deploy

### Web (Expo for Web)
```bash
npm run web
expo build:web
```

### App Stores
- Google Play: Requer conta de desenvolvedor ($25 única vez)
- Apple App Store: Requer conta de desenvolvedor ($99/ano)

## 📚 Recursos Adicionais

- [Documentação Expo](https://docs.expo.dev/)
- [Documentação React Native](https://reactnavigation.org/)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)

## 🆘 Precisa de Ajuda?

- Abra uma issue no GitHub
- Consulte a documentação oficial
- Stack Overflow com tag `expo` ou `react-native`

---

**Boa sorte com seu projeto! 🚀**
