# 🚀 Início Rápido

Comece a usar o aplicativo em 5 minutos!

## Pré-requisitos

- ✅ Node.js 18+ instalado
- ✅ Smartphone com Expo Go instalado
- ✅ Conta Firebase (gratuita)

## Passos Rápidos

### 1. Clone e Instale

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd mobile-tcc

# Instale as dependências
npm install
```

### 2. Configure o Firebase

1. Acesse https://console.firebase.google.com/
2. Crie um novo projeto
3. Ative "Authentication" → "E-mail/senha"
4. Copie as credenciais do projeto
5. Renomeie `src/config/firebase.example.js` → `firebase.js`
6. Cole suas credenciais no arquivo

### 3. Execute o App

```bash
npm start
```

### 4. Abra no Celular

1. Instale o app **Expo Go** no seu celular:
   - 📱 [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - 🍎 [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. Escaneie o QR Code que apareceu no terminal

3. Aguarde o app carregar

### 5. Teste o App

1. **Crie uma conta** com seu e-mail
2. **Verifique seu e-mail** (chegará em segundos)
3. **Faça login** no app
4. **Registre um consumo** na aba "Registrar"
   - Ex: 20km de carro pequeno
   - Ex: 150 kWh de energia
5. **Veja os relatórios** na aba "Relatórios"
6. **Confira as dicas** na aba "Dicas"

## 🎯 Exemplo de Teste Rápido

### Dados de Teste Sugeridos

**Transporte Terrestre:**
- Tipo: Carro pequeno (até 1.4L) - Gasolina
- Distância: 25 km
- **Resultado:** 4.80 kg CO₂

**Energia:**
- Consumo: 150 kWh
- **Resultado:** 12.60 kg CO₂

**Total Esperado:** ~17.40 kg CO₂

## ⚡ Comandos Úteis

```bash
# Iniciar o app
npm start

# Limpar cache
npm start -- --reset-cache

# Executar no Android (requer emulador)
npm run android

# Executar no iOS (requer macOS + Xcode)
npm run ios
```

## 🐛 Problemas Comuns

### "Cannot find module firebase"
```bash
# Solução: Verifique se renomeou o arquivo
mv src/config/firebase.example.js src/config/firebase.js
```

### "Metro bundler error"
```bash
# Solução: Limpar cache
npm start -- --reset-cache
```

### QR Code não funciona
```bash
# Solução: Usar modo tunnel
npm start --tunnel
```

## 📚 Próximos Passos

- ✅ Leia o [README.md](README.md) completo
- ✅ Veja o [SETUP.md](SETUP.md) para configurações avançadas
- ✅ Configure seu próprio Firebase
- ✅ Personalize cores e textos
- ✅ Adicione novos fatores de emissão

## 💡 Dicas

- Use o **Modo Tunnel** se estiver em rede corporativa
- **Expo Go** é mais fácil que emuladores para desenvolvimento
- Dados são salvos **localmente** no dispositivo
- **Não compartilhe** suas credenciais do Firebase

## 🆘 Precisa de Ajuda?

- 📖 [Documentação Completa](README.md)
- 🛠️ [Guia de Setup](SETUP.md)
- 🤝 [Como Contribuir](CONTRIBUINDO.md)
- 📝 Abra uma Issue no GitHub

---

**Divirta-se desenvolvendo! 🌱**
