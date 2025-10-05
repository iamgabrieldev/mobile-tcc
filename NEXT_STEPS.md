# 🎯 Próximos Passos

## 🚀 Para Começar AGORA (5 minutos)

### 1. Instale as dependências
```bash
cd mobile-tcc
npm install
```

### 2. Configure o Firebase
1. Vá para https://console.firebase.google.com/
2. Crie um novo projeto (nome: "calculadora-carbono")
3. Ative Authentication → E-mail/senha
4. Copie as credenciais
5. Execute:
```bash
# No diretório do projeto
copy src\config\firebase.example.js src\config\firebase.js
# Ou no Mac/Linux: cp src/config/firebase.example.js src/config/firebase.js
```
6. Abra `src/config/firebase.js` e cole suas credenciais

### 3. Execute o app
```bash
npm start
```

### 4. Abra no celular
- Baixe "Expo Go" na Play Store ou App Store
- Escaneie o QR Code
- Pronto! 🎉

## 📱 Testando o App (10 minutos)

### Teste Rápido
1. **Crie uma conta** (use um e-mail real)
2. **Verifique o e-mail** (chegará em segundos)
3. **Faça login**
4. **Registre um consumo:**
   - Carro pequeno: 25 km
   - Energia: 15 kWh
5. **Veja o resultado:** ~5.86 kg CO₂
6. **Acesse Relatórios** para ver gráficos
7. **Confira as Dicas** personalizadas

## 🎨 Personalizando o App

### Mudar Cores
Edite `src/constants/colors.js`:
```javascript
export const COLORS = {
  primary: '#4CAF50',  // ← Mude aqui
  // ...
};
```

### Adicionar Novo Fator de Emissão
Edite `src/constants/emissionFactors.js`:
```javascript
MOTO: {
  label: 'Motocicleta',
  factor: 0.070,
  unit: 'kg CO₂/km',
  category: 'transport_land'
}
```

### Customizar Dicas
Edite `src/services/tipsService.js` e adicione novas dicas.

## 📚 Documentação Importante

Leia na ordem:

1. ✅ [QUICKSTART.md](QUICKSTART.md) - Início rápido
2. ✅ [README.md](README.md) - Visão geral completa
3. ⚙️ [SETUP.md](SETUP.md) - Configuração detalhada
4. 🧪 [TESTING.md](TESTING.md) - Como testar
5. 📊 [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Estrutura técnica

## 🔧 Problemas Comuns

### Erro: Cannot find module 'firebase'
```bash
# Solução
npm install
```

### Erro: Firebase não inicializa
- Verifique se o arquivo está em `src/config/firebase.js` (não `.example.js`)
- Confirme que colou as credenciais corretas

### QR Code não funciona
```bash
# Use modo tunnel
npm start --tunnel
```

### Picker não aparece
```bash
# Instale a dependência
npm install @react-native-picker/picker
```

## 📦 Build para Produção

### Android (APK/AAB)

**Para teste rápido (APK):**
```bash
npm run build:android:preview
```

**Para publicar na Play Store (AAB):**
```bash
npm run build:android
```

### iOS (IPA)
```bash
npm run build:ios
```

### 🏪 Publicar na Play Store

**Guia completo:**
👉 Leia [DEPLOY_PLAYSTORE.md](DEPLOY_PLAYSTORE.md) para passo a passo detalhado

**Resumo rápido:**
1. Criar conta Play Console ($25)
2. Preparar assets (ícone, screenshots)
3. Fazer build: `npm run build:android`
4. Upload no Play Console
5. Aguardar aprovação (1-7 dias)

**Comandos úteis:**
```bash
# Verificar se está pronto
npm run check-release

# Build de produção
npm run build:android

# Enviar para Play Store
npm run submit:android
```

## 🎓 Para Apresentação do TCC

### Prepare:
1. ✅ App funcionando no celular
2. ✅ Dados de demonstração cadastrados
3. ✅ Screenshots das principais telas
4. ✅ PDF de exemplo gerado
5. ✅ Slides explicando:
   - Problema (mudanças climáticas)
   - Solução (app de monitoramento)
   - Tecnologias (React Native, Firebase)
   - Demonstração ao vivo
   - Resultados e impacto

### Demo Script:
```
1. "Vou mostrar como calcular pegada de carbono"
2. Abrir app → Mostrar tela inicial
3. Ir para "Registrar" → Preencher dados
4. Mostrar cálculo automático
5. Voltar para Home → Mostrar cards
6. Ir para Relatórios → Mostrar gráficos
7. Exportar PDF → Mostrar resultado
8. Ir para Dicas → Mostrar personalização
```

## 🚀 Melhorias Futuras (Pós-TCC)

### Curto Prazo (1-2 semanas)
- [ ] Adicionar mais categorias (alimentação, resíduos)
- [ ] Modo escuro
- [ ] Notificações de lembrete
- [ ] Tutorial de primeira uso

### Médio Prazo (1-2 meses)
- [ ] Gamificação (badges, níveis)
- [ ] Comparação com amigos
- [ ] Metas pessoais
- [ ] Widget para tela inicial

### Longo Prazo (3+ meses)
- [ ] Integração com APIs de transporte
- [ ] Machine Learning para sugestões
- [ ] Marketplace de compensação
- [ ] Versão web

## 📊 Métricas para Acompanhar

- Downloads
- Usuários ativos
- Registros por dia
- Taxa de retenção
- Compartilhamentos

## 🤝 Contribuindo

Quer melhorar o app?
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit (`git commit -m 'Add: nova feature'`)
4. Push (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Precisa de Ajuda?

### Recursos:
- 📖 [Documentação Expo](https://docs.expo.dev/)
- 📖 [React Native Docs](https://reactnavigation.org/)
- 📖 [Firebase Docs](https://firebase.google.com/docs)
- 🎥 [YouTube: React Native](https://www.youtube.com/results?search_query=react+native+tutorial)

### Comunidade:
- Stack Overflow (tag: `react-native`, `expo`)
- Reddit: r/reactnative
- Discord: Expo Community

### Issues:
- Abra uma Issue no GitHub
- Descreva o problema detalhadamente
- Inclua prints e logs

## ✅ Checklist Final

Antes de apresentar o TCC:

- [ ] App funciona sem erros
- [ ] Firebase configurado
- [ ] Dados de teste cadastrados
- [ ] Screenshots tirados
- [ ] Documentação revisada
- [ ] Código comentado
- [ ] README atualizado
- [ ] Apresentação preparada
- [ ] Demo testada 3x
- [ ] Celular carregado 🔋

## 🎉 Parabéns!

Você criou um aplicativo completo de calculadora de pegada de carbono!

**Próximo passo:** Execute `npm start` e comece a testar! 🚀

---

**Dúvidas? Abra uma Issue!**
**Funcionou? Dê uma ⭐ no repositório!**
