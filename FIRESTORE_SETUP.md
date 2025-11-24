# 🔥 Configuração do Firestore

Este guia explica como configurar o Firestore no Firebase Console para usar o sistema de ranking e pontos.

## ⚠️ Erro Comum: "Failed to get document because the client is offline"

Se você está vendo este erro, é porque:
1. O Firestore não está habilitado no seu projeto Firebase
2. As regras de segurança do Firestore não estão configuradas
3. Você está sem conexão com a internet

## 🚀 Solução Rápida

### Passo 1: Habilitar o Firestore

1. **Acesse o Firebase Console**
   - Vá para: [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Selecione seu projeto (`calculadora-tcc`)

2. **Ative o Firestore Database**
   - No menu lateral, clique em **"Firestore Database"**
   - Clique em **"Criar banco de dados"** ou **"Create database"**
   - Escolha o modo de inicialização:
     - **Modo de produção**: Recomendado inicialmente
     - **Modo de teste**: Permite acesso sem autenticação por 30 dias

3. **Selecione a localização**
   - Escolha a região mais próxima (ex: `southamerica-east1` para São Paulo)
   - Clique em **"Ativar"** ou **"Enable"**

### Passo 2: Configurar Regras de Segurança

Após criar o banco de dados, configure as regras de segurança:

1. **Acesse a aba "Regras" (Rules)**
   - No Firestore Database, clique na aba **"Rules"**

2. **Configure as regras de acesso**

   **Opção 1: Regras para Desenvolvimento (Permite tudo temporariamente)**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.time < timestamp.date(2025, 12, 31);
       }
     }
   }
   ```

   **Opção 2: Regras de Produção (Recomendado)**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       
       // Regras para pontos de usuários
       match /userPoints/{userId} {
         // Qualquer usuário autenticado pode ler pontos de todos
         allow read: if request.auth != null;
         
         // Apenas o próprio usuário pode escrever seus pontos
         allow write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Regras para histórico de pontos
       match /pointsHistory/{historyId} {
         // Usuários autenticados podem ler o histórico
         allow read: if request.auth != null;
         
         // Apenas o próprio usuário pode criar histórico
         allow create: if request.auth != null && 
                          request.resource.data.userId == request.auth.uid;
       }
       
       // Regras para emissões
       match /emissions/{emissionId} {
         // Usuários podem ler apenas suas próprias emissões
         allow read: if request.auth != null && 
                        resource.data.userId == request.auth.uid;
         
         // Usuários podem criar/atualizar apenas suas próprias emissões
         allow write: if request.auth != null && 
                         request.resource.data.userId == request.auth.uid;
       }
     }
   }
   ```

3. **Publique as regras**
   - Clique em **"Publicar"** ou **"Publish"**

### Passo 3: Criar Índices (Opcional mas Recomendado)

Para melhor performance nas consultas:

1. **Acesse a aba "Índices" (Indexes)**

2. **Crie índices compostos**:
   
   **Para consultas de ranking:**
   - Coleção: `userPoints`
   - Campos indexados:
     - `totalPoints` (Descendente)
     - `lastUpdate` (Descendente)
   
   **Para consultas de histórico:**
   - Coleção: `pointsHistory`
   - Campos indexados:
     - `userId` (Crescente)
     - `timestamp` (Descendente)

## 🔧 Verificação

Após a configuração, teste no app:

1. **Abra o app**
2. **Registre uma emissão**
3. **Vá para a tela de Ranking**
4. **Verifique se aparece sua pontuação**

Se ainda houver erro, verifique:
- ✅ Firestore está habilitado
- ✅ Regras de segurança estão publicadas
- ✅ Você está conectado à internet
- ✅ Usuário está autenticado no app

## 💡 Modo Offline

O app agora tem suporte a modo offline! Se o Firestore não estiver disponível:

- ✅ Pontos são salvos localmente no dispositivo
- ✅ Você pode continuar usando o app normalmente
- ✅ Ranking mostrará mensagem informativa
- ⚠️ Dados serão sincronizados quando voltar online

## 📊 Estrutura das Coleções

### `userPoints` (Pontos dos Usuários)
```javascript
{
  userId: string,           // ID do usuário
  totalPoints: number,      // Pontos totais acumulados
  dailyPoints: number,      // Pontos do dia
  weeklyPoints: number,     // Pontos da semana
  lastEmission: number,     // Última emissão registrada
  lastUpdate: timestamp,    // Data da última atualização
  createdAt: timestamp      // Data de criação
}
```

### `pointsHistory` (Histórico de Pontos)
```javascript
{
  userId: string,      // ID do usuário
  points: number,      // Pontos ganhos/perdidos
  emission: number,    // Emissão registrada
  period: string,      // 'daily' ou 'weekly'
  timestamp: timestamp // Data do registro
}
```

### `emissions` (Emissões Registradas)
```javascript
{
  userId: string,         // ID do usuário
  date: timestamp,        // Data do registro
  consumptions: {         // Dados de consumo
    transport_land: [],
    transport_air: [],
    energy: number,
    gas: []
  },
  emissions: {            // Emissões calculadas
    total: number,
    breakdown: {
      transport_land: number,
      transport_air: number,
      energy: number,
      gas: number
    }
  }
}
```

## 🆘 Troubleshooting

### Erro: "Missing or insufficient permissions"
**Solução:** Verifique se as regras de segurança estão configuradas corretamente e se o usuário está autenticado.

### Erro: "The query requires an index"
**Solução:** O Firestore mostrará um link no erro. Clique nele para criar o índice automaticamente.

### Erro: "Failed to get document because the client is offline"
**Solução:** 
1. Verifique sua conexão com a internet
2. Confirme que o Firestore está habilitado
3. O app usará armazenamento local automaticamente

### Dados não aparecem no Firestore Console
**Solução:** 
1. Confirme que você registrou emissões no app
2. Verifique se não há erros no console do app
3. Confira se as regras de segurança permitem escrita

## 📈 Monitoramento

No Firebase Console, você pode monitorar:

1. **Usage (Uso)**
   - Quantidade de leituras/escritas
   - Dados armazenados
   - Largura de banda

2. **Data (Dados)**
   - Visualizar documentos criados
   - Editar dados manualmente
   - Deletar documentos

3. **Rules (Regras)**
   - Ver regras atuais
   - Testar regras
   - Publicar atualizações

## 🎯 Próximos Passos

Após configurar o Firestore:

1. ✅ Teste o sistema de pontos
2. ✅ Verifique o ranking com múltiplos usuários
3. ✅ Configure índices para melhor performance
4. ✅ Ajuste regras de segurança conforme necessário
5. ✅ Monitore uso e custos no Firebase Console

## 💰 Limites Gratuitos do Firestore

O plano gratuito (Spark) inclui:
- **50,000 leituras/dia**
- **20,000 escritas/dia**
- **20,000 exclusões/dia**
- **1 GB armazenamento**

Para a maioria dos casos de uso pessoal e desenvolvimento, isso é mais que suficiente!

## 📚 Recursos Adicionais

- [Documentação do Firestore](https://firebase.google.com/docs/firestore)
- [Regras de Segurança](https://firebase.google.com/docs/firestore/security/get-started)
- [Índices no Firestore](https://firebase.google.com/docs/firestore/query-data/indexing)

---

**Dúvidas?** Confira a documentação oficial ou abra uma issue no repositório!

🌱 **Firestore configurado com sucesso? Agora você pode usar o ranking completo!** 🏆


