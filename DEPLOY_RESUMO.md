# 📱 Resumo Rápido - Deploy Play Store

## 🎯 Passos Principais

### 1️⃣ Preparar ($0)
- ✅ Criar ícone 512x512px
- ✅ Tirar screenshots (2-8)
- ✅ Escrever descrições
- ✅ Publicar política de privacidade

### 2️⃣ Criar Conta Play Console ($25)
- 💰 Pagar taxa única de $25
- ⏳ Aguardar aprovação (48h)

### 3️⃣ Configurar Projeto
```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar
eas build:configure
```

### 4️⃣ Build do App
```bash
# Build para produção (AAB)
npm run build:android

# Ou comando direto:
eas build --platform android --profile production
```

⏳ Aguarde 15-30 minutos

### 5️⃣ Configurar Play Console
1. Criar app
2. Upload de assets (ícone, screenshots)
3. Preencher descrições
4. Classificação de conteúdo
5. Política de privacidade

### 6️⃣ Upload do AAB
1. Download do arquivo .aab
2. Play Console → Teste Interno
3. Upload do .aab
4. Testar com 5-10 pessoas

### 7️⃣ Publicar
1. Promover para Produção
2. Enviar para revisão
3. ⏳ Aguardar 1-7 dias
4. ✅ App publicado!

## ⚡ Comandos Úteis

```bash
# Verificar se está pronto
npm run check-release

# Build de teste (APK)
npm run build:android:preview

# Build de produção (AAB)
npm run build:android

# Ver builds
eas build:list

# Enviar para Play Store
npm run submit:android
```

## 📋 Checklist Mínimo

- [ ] Ícone 512x512px criado
- [ ] 2+ screenshots
- [ ] Descrição escrita
- [ ] Política de privacidade online
- [ ] Conta Play Console ($25)
- [ ] Build AAB concluído
- [ ] Upload no Play Console
- [ ] App revisado e aprovado

## 💰 Custo Total

| Item | Valor |
|------|-------|
| Conta Google Play | $25 (única vez) |
| **TOTAL** | **$25** |

## ⏱️ Tempo Estimado

| Etapa | Tempo |
|-------|-------|
| Preparar assets | 2-4 horas |
| Configurar projeto | 30 min |
| Build | 30 min |
| Configurar Play Console | 1-2 horas |
| Teste interno | 3-7 dias |
| Revisão Google | 1-7 dias |
| **TOTAL** | **~7-14 dias** |

## 🔗 Links Importantes

- 📄 [Guia Completo](DEPLOY_PLAYSTORE.md)
- 🏪 [Play Console](https://play.google.com/console/)
- 📖 [Docs EAS](https://docs.expo.dev/build/introduction/)
- 🔒 [Política de Privacidade](privacy-policy.html)

## 🆘 Precisa de Ajuda?

Leia o guia completo: **[DEPLOY_PLAYSTORE.md](DEPLOY_PLAYSTORE.md)**

---

**Boa sorte! 🚀**

