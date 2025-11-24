# 🤖 Configuração do Google Gemini AI

Este guia explica como configurar a API do Google Gemini AI para obter análises personalizadas de hábitos de carbono no aplicativo.

## 📋 Pré-requisitos

- Conta Google
- Acesso ao Google AI Studio

## 🔑 Como obter sua API Key

1. **Acesse o Google AI Studio**
   - Visite: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Faça login com sua conta Google

2. **Crie uma API Key**
   - Clique em "Create API Key"
   - Selecione um projeto existente ou crie um novo
   - Copie a API Key gerada

3. **Configure no Aplicativo**
   
   **Opção 1: Através da Interface (Recomendado)**
   - Abra o app
   - Navegue até a aba "Perfil"
   - Toque em "Configurar API Key"
   - Cole sua API Key
   - Toque em "Salvar"

   **Opção 2: Diretamente no Código**
   - Abra o arquivo `src/services/geminiService.js`
   - Localize a linha: `this.apiKey = 'SUA_API_KEY_AQUI';`
   - Substitua `'SUA_API_KEY_AQUI'` pela sua API Key
   - Exemplo: `this.apiKey = 'AIzaSyA...';`

## ⚠️ Segurança

### **IMPORTANTE**: Nunca commite sua API Key no repositório!

Para uso em produção, use variáveis de ambiente:

1. Instale o pacote de configuração:
```bash
npm install react-native-dotenv
```

2. Crie um arquivo `.env` na raiz do projeto:
```env
GEMINI_API_KEY=sua_api_key_aqui
```

3. Adicione `.env` ao `.gitignore`:
```
.env
```

4. Use a variável no código:
```javascript
import { GEMINI_API_KEY } from '@env';

this.apiKey = GEMINI_API_KEY;
```

## 🎯 Funcionalidades que Usam Gemini AI

### Análise de Hábitos
- Resumo personalizado das suas emissões
- Identificação de pontos fortes
- Sugestões de áreas de melhoria
- Recomendações práticas de ações
- Metas personalizadas

### Como Usar
1. Registre suas emissões diárias regularmente
2. Acumule pelo menos alguns registros
3. Vá até a aba "Perfil"
4. Toque em "Analisar Meus Hábitos"
5. Aguarde alguns segundos enquanto a IA analisa seus dados

## 📊 Modo Fallback

Se você não configurar a API Key, o app funcionará normalmente com análises básicas:
- Análises pré-programadas baseadas em seus dados
- Recomendações genéricas mas úteis
- Cálculo de árvores necessárias
- Sistema de pontos e ranking

Para análises mais personalizadas e insights específicos, configure a API Key do Gemini!

## 🔄 Limites de Uso

O Google Gemini AI tem limites de uso gratuito:
- **Tier Gratuito**: 60 requisições por minuto
- **Cota Diária**: Geralmente suficiente para uso pessoal

Para mais informações sobre limites e pricing:
[https://ai.google.dev/pricing](https://ai.google.dev/pricing)

## ❓ Troubleshooting

### "API Key não configurada"
- Verifique se você configurou a API Key corretamente
- Confirme que copiou a chave completa

### "Erro ao analisar hábitos"
- Verifique sua conexão com a internet
- Confirme que sua API Key é válida
- Verifique se não excedeu os limites de uso

### Análise demora muito
- Isso é normal, pode levar 5-10 segundos
- A IA está processando seus dados e gerando insights personalizados

## 🆘 Suporte

Se encontrar problemas:
1. Verifique se sua API Key está correta
2. Confirme que tem registros de emissões salvos
3. Tente usar o modo fallback primeiro
4. Entre em contato com o desenvolvedor se o problema persistir

## 🎉 Pronto!

Agora você pode aproveitar análises personalizadas por IA para reduzir sua pegada de carbono!

