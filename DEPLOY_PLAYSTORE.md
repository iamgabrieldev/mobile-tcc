# 🚀 Deploy na Google Play Store - Guia Completo

Este guia detalha o processo completo para publicar seu app na Google Play Store.

## 📋 Pré-requisitos

### Antes de Começar

- [ ] App funcionando perfeitamente sem erros
- [ ] Firebase configurado e funcionando
- [ ] Testado em dispositivos Android reais
- [ ] Todos os bugs conhecidos corrigidos
- [ ] Versão final do código pronta

### Contas Necessárias

1. **Conta Google Play Console** ($25 taxa única)
   - Acesse: https://play.google.com/console/signup
   - Pagamento único de $25 USD
   - Processo de verificação leva ~48h

2. **Conta Expo** (gratuita)
   - Acesse: https://expo.dev/
   - Crie uma conta gratuita

### Recursos Necessários

- [ ] **Ícone do App** (512x512px, PNG, sem cantos arredondados)
- [ ] **Imagem de Destaque** (1024x500px)
- [ ] **Screenshots** (mínimo 2, máximo 8):
  - Telefone: 1080x1920px ou 1080x2340px
  - Tablet: 1200x1920px (opcional)
- [ ] **Descrição curta** (máximo 80 caracteres)
- [ ] **Descrição completa** (máximo 4000 caracteres)
- [ ] **Política de Privacidade** (URL pública)

---

## 🎨 PASSO 1: Preparar Assets

### 1.1. Criar Ícone do App

**Especificações:**
- Tamanho: 512x512px
- Formato: PNG (com transparência)
- Sem cantos arredondados (Play Store adiciona)
- Sem texto (deve ser legível em 48x48px)

**Ferramentas:**
- [Figma](https://www.figma.com/)
- [Canva](https://www.canva.com/)
- [GIMP](https://www.gimp.org/) (gratuito)

**Salvar em:** `assets/playstore/icon-512.png`

### 1.2. Criar Screenshots

**Como capturar:**

1. Execute o app no Android
2. Navegue para cada tela principal:
   - Tela de Login
   - Tela Inicial (Home)
   - Registro de Consumo
   - Relatórios com gráficos
   - Dicas Personalizadas

3. Tire screenshots (Power + Volume Down)

4. **Edite os screenshots** (opcional mas recomendado):
   - Adicione moldura do celular
   - Adicione texto explicativo
   - Use ferramentas: https://screenshots.pro/ ou https://previewed.app/

**Salvar em:** `assets/playstore/screenshots/`

### 1.3. Criar Imagem de Destaque

**Especificações:**
- Tamanho: 1024x500px
- Formato: PNG ou JPG
- Use cores do app (#4CAF50)
- Inclua: Nome do app, ícone, slogan

**Template sugerido:**
```
┌────────────────────────────────────────┐
│  🌱 Calculadora de Pegada de Carbono  │
│                                        │
│  Monitore suas emissões diárias        │
│  e faça a diferença pelo planeta       │
└────────────────────────────────────────┘
```

**Salvar em:** `assets/playstore/feature-graphic.png`

### 1.4. Preparar Descrições

**Descrição Curta (80 caracteres):**
```
Calcule e monitore sua pegada de carbono diária. Receba dicas sustentáveis!
```

**Descrição Completa:**
```
🌱 Calculadora de Pegada de Carbono

Monitore suas emissões de CO₂ e contribua para um planeta mais sustentável!

✨ PRINCIPAIS RECURSOS

📊 Cálculo Automático
• Baseado em fatores IPCC 2023
• Transporte terrestre e aéreo
• Consumo de energia e gás
• Resultados em tempo real

📈 Relatórios Detalhados
• Gráficos de evolução mensal
• Comparação por categoria
• Exportação em PDF e CSV
• Histórico de 24 meses

💡 Dicas Personalizadas
• Sugestões baseadas no seu consumo
• Classificação por impacto
• Dicas práticas e acionáveis

🔒 SEGURANÇA E PRIVACIDADE
• Seus dados são armazenados localmente
• Autenticação segura com Firebase
• Sem compartilhamento de informações

🌍 IMPACTO AMBIENTAL
Ajude a reduzir emissões de gases de efeito estufa através de escolhas mais conscientes no dia a dia.

📱 CATEGORIAS MONITORADAS
• Transporte terrestre (carro, ônibus, etc)
• Transporte aéreo (voos nacionais e internacionais)
• Energia elétrica residencial
• Consumo de gás (GLP e gás natural)

🎯 IDEAL PARA
• Pessoas conscientes ambientalmente
• Estudantes de sustentabilidade
• Empresas que desejam medir impacto
• Qualquer um que queira fazer a diferença

Faça sua parte! Baixe agora e comece a monitorar sua pegada de carbono hoje mesmo.

#Sustentabilidade #MeioAmbiente #PegadaDeCarbono #IPCC
```

---

## ⚙️ PASSO 2: Configurar Projeto

### 2.1. Atualizar app.json

Edite o arquivo `app.json`:

```json
{
  "expo": {
    "name": "Calculadora Pegada de Carbono",
    "slug": "calculadora-pegada-carbono",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#4CAF50"
    },
    "assetBundlePatterns": ["**/*"],
    "android": {
      "package": "com.seunome.calculadoracarbono",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#4CAF50"
      },
      "permissions": [],
      "googleServicesFile": "./google-services.json"
    },
    "extra": {
      "eas": {
        "projectId": "SEU_PROJECT_ID_AQUI"
      }
    }
  }
}
```

**Importante:** Mude `com.seunome.calculadoracarbono` para seu próprio identificador único!

### 2.2. Instalar EAS CLI

```bash
npm install -g eas-cli
```

### 2.3. Login no Expo

```bash
eas login
```

Digite suas credenciais do Expo.

### 2.4. Configurar EAS

```bash
eas build:configure
```

Isso criará um arquivo `eas.json`. Edite-o:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./pc-api-key.json",
        "track": "internal"
      }
    }
  }
}
```

---

## 🔑 PASSO 3: Criar Keystore (Chave de Assinatura)

### 3.1. Gerar Keystore Automaticamente

```bash
eas credentials
```

Selecione:
1. `Android`
2. `production`
3. `Set up a new keystore`
4. `Generate new keystore`

**Importante:** O EAS gerenciará a keystore para você. Não perca o acesso à sua conta Expo!

---

## 📦 PASSO 4: Build do App

### 4.1. Build para Produção (AAB)

Para publicar na Play Store, você precisa do formato AAB:

```bash
eas build --platform android --profile production
```

Ou para testar primeiro, gere um APK:

```bash
eas build --platform android --profile preview
```

### 4.2. Acompanhar o Build

O build será feito nos servidores Expo:
- Acompanhe em: https://expo.dev/accounts/[sua-conta]/projects/[seu-projeto]/builds
- Tempo estimado: 15-30 minutos
- Você receberá um email quando finalizar

### 4.3. Baixar o Arquivo

Após o build:
1. Acesse o link fornecido
2. Baixe o arquivo `.aab` (Android App Bundle)
3. Salve em um local seguro

---

## 🏪 PASSO 5: Configurar Play Console

### 5.1. Criar Aplicativo

1. Acesse: https://play.google.com/console/
2. Clique em **"Criar app"**
3. Preencha:
   - **Nome:** Calculadora de Pegada de Carbono
   - **Idioma padrão:** Português (Brasil)
   - **App ou jogo:** App
   - **Gratuito ou pago:** Gratuito
4. Aceite os termos
5. Clique em **"Criar app"**

### 5.2. Configurar Loja

#### Aba: Detalhes do App

1. **Descrição curta:** (Cole a descrição de 80 caracteres)
2. **Descrição completa:** (Cole a descrição longa)
3. **Ícone do app:** Upload do ícone 512x512px
4. **Imagem de destaque:** Upload 1024x500px
5. **Screenshots:** Upload de 2-8 imagens

#### Aba: Categorização

1. **Categoria:** Estilo de vida ou Produtividade
2. **Tags:** Sustentabilidade, Meio Ambiente, Calculadora

#### Aba: Informações de Contato

1. **Email:** seu@email.com
2. **Website:** (opcional, ou link do GitHub)
3. **Política de privacidade:** URL pública

**Criar Política de Privacidade:**
- Use: https://www.privacypolicygenerator.info/
- Ou crie uma página no GitHub Pages
- Exemplo: https://seugithub.github.io/mobile-tcc/privacy.html

### 5.3. Classificação de Conteúdo

1. Acesse **Classificação de conteúdo**
2. Preencha o questionário:
   - Não contém violência
   - Não contém conteúdo sexual
   - Não contém linguagem ofensiva
   - Não contém jogos de azar
3. Salve e envie para classificação

### 5.4. Público-Alvo

1. **Faixa etária:** Todas as idades
2. **Não direcionado a crianças**

### 5.5. Declaração de Segurança

1. **Coleta dados?** Sim (e-mail para autenticação)
2. **Dados coletados:**
   - E-mail (obrigatório)
   - Dados de uso (consumo de carbono)
3. **Dados criptografados em trânsito?** Sim
4. **Dados podem ser excluídos?** Sim
5. **Política de privacidade:** (Cole o link)

---

## 🚀 PASSO 6: Upload do APK/AAB

### 6.1. Criar Versão de Teste

1. No menu lateral, vá em **Testes > Teste interno**
2. Clique em **"Criar nova versão"**
3. **Upload do app bundle:**
   - Arraste o arquivo `.aab` que você baixou
   - Aguarde o upload
4. **Nome da versão:** 1.0.0
5. **Notas da versão:**
```
Versão inicial:
• Cálculo de pegada de carbono
• Relatórios com gráficos
• Dicas personalizadas
• Exportação de dados
```
6. Clique em **"Salvar"**
7. Clique em **"Revisar versão"**

### 6.2. Configurar Testadores

1. Crie uma lista de testadores
2. Adicione e-mails de pessoas que testarão
3. Ou use um link de teste aberto
4. Clique em **"Iniciar implementação para teste interno"**

### 6.3. Teste Interno (Recomendado)

1. Distribua o link de teste para 5-10 pessoas
2. Peça para testarem por 3-7 dias
3. Colete feedback
4. Corrija bugs encontrados
5. Faça novo build se necessário

---

## 📱 PASSO 7: Publicação em Produção

### 7.1. Revisar Checklist

- [ ] App testado sem erros
- [ ] Todas as informações da loja preenchidas
- [ ] Política de privacidade publicada
- [ ] Screenshots de qualidade
- [ ] Descrição revisada
- [ ] Classificação de conteúdo aprovada
- [ ] Teste interno concluído

### 7.2. Promover para Produção

1. Vá em **Produção**
2. Clique em **"Criar nova versão"**
3. **Selecione a versão testada** ou faça upload de novo AAB
4. **Países:** Brasil (ou adicione mais países)
5. **Notas da versão:**
```
🌱 Bem-vindo à Calculadora de Pegada de Carbono!

Nesta versão inicial você pode:
✓ Calcular emissões diárias de CO₂
✓ Ver relatórios mensais com gráficos
✓ Receber dicas personalizadas
✓ Exportar dados em PDF/CSV

Ajude a salvar o planeta! 🌍
```

### 7.3. Enviar para Revisão

1. Clique em **"Revisar versão"**
2. Revise todas as informações
3. Clique em **"Iniciar implementação para produção"**

### 7.4. Aguardar Aprovação

- **Tempo:** 1-7 dias (geralmente 1-3 dias)
- **Notificação:** Você receberá e-mail
- **Status:** Acompanhe em "Painel"

---

## ✅ PASSO 8: Pós-Publicação

### 8.1. Monitorar

1. **Painel de Controle:**
   - Instalações
   - Avaliações
   - Crashes (se houver)

2. **Responder Avaliações:**
   - Agradeça avaliações positivas
   - Resolva problemas reportados

### 8.2. Atualizar App

Quando fizer atualizações:

1. **Atualize a versão** em `app.json`:
```json
{
  "version": "1.0.1",
  "android": {
    "versionCode": 2
  }
}
```

2. **Novo build:**
```bash
eas build --platform android --profile production
```

3. **Upload no Play Console:**
   - Produção > Nova versão
   - Upload do novo AAB
   - Notas da atualização

---

## 🎯 Comandos Essenciais

```bash
# 1. Configurar EAS
eas build:configure

# 2. Build de teste (APK)
eas build --platform android --profile preview

# 3. Build de produção (AAB)
eas build --platform android --profile production

# 4. Verificar builds
eas build:list

# 5. Enviar para Play Store (automático)
eas submit --platform android
```

---

## 📊 Checklist Final de Publicação

### Antes do Build
- [ ] App funcionando 100%
- [ ] Firebase configurado
- [ ] Todos os testes passando
- [ ] Código limpo e comentado
- [ ] Versão definida em app.json

### Assets Criados
- [ ] Ícone 512x512px
- [ ] Imagem de destaque 1024x500px
- [ ] 2-8 screenshots de qualidade
- [ ] Descrições escritas
- [ ] Política de privacidade publicada

### Play Console
- [ ] Conta criada ($25 pagos)
- [ ] App criado no console
- [ ] Informações da loja preenchidas
- [ ] Classificação de conteúdo completa
- [ ] Público-alvo definido
- [ ] Declaração de segurança preenchida

### Build e Upload
- [ ] EAS CLI instalado
- [ ] Build concluído com sucesso
- [ ] AAB baixado
- [ ] Upload no Play Console
- [ ] Teste interno realizado
- [ ] Enviado para produção

### Pós-Publicação
- [ ] App aprovado pelo Google
- [ ] Link da Play Store funcionando
- [ ] Monitorando instalações
- [ ] Respondendo avaliações

---

## 🆘 Problemas Comuns

### Build falha
```bash
# Limpar cache e tentar novamente
eas build --platform android --clear-cache
```

### "App Bundle não assinado"
- Certifique-se de ter configurado a keystore via `eas credentials`

### Rejeição da Play Store
Motivos comuns:
- Política de privacidade ausente
- Screenshots de baixa qualidade
- Descrição inadequada
- App crashando

### Atualização não aparece
- Pode levar até 24h para propagar
- Force update no Google Play

---

## 💰 Custos

| Item | Valor |
|------|-------|
| Conta Google Play Developer | $25 (uma vez) |
| Conta Expo (gratuita) | $0 |
| Builds EAS (até 30/mês gratuitos) | $0 |
| **TOTAL PARA COMEÇAR** | **$25** |

**Plano Expo pago (opcional):**
- Priority builds: $29/mês
- Builds ilimitados
- Suporte prioritário

---

## 📚 Recursos Úteis

- [Google Play Console](https://play.google.com/console/)
- [Documentação EAS Build](https://docs.expo.dev/build/introduction/)
- [Guia de Publicação Expo](https://docs.expo.dev/submit/android/)
- [Políticas da Play Store](https://play.google.com/about/developer-content-policy/)
- [Gerador de Screenshots](https://screenshots.pro/)

---

## 🎓 Para o TCC

### Documentar no Trabalho

1. **Processo de Deploy:**
   - Mostre prints do Play Console
   - Documente as etapas
   - Inclua link da loja

2. **Métricas:**
   - Número de instalações
   - Avaliações recebidas
   - Feedback de usuários

3. **Aprendizados:**
   - Desafios encontrados
   - Soluções aplicadas

---

## ✨ Resultado Final

Após seguir todos os passos, você terá:

✅ App publicado na Google Play Store
✅ Link público: `https://play.google.com/store/apps/details?id=com.seunome.calculadoracarbono`
✅ Disponível para download em todo mundo
✅ Dashboard para monitorar instalações
✅ Portfólio profissional enriquecido

---

**Boa sorte com a publicação! 🚀🌱**

*Precisa de ajuda? Consulte a [documentação Expo](https://docs.expo.dev/) ou abra uma Issue!*

