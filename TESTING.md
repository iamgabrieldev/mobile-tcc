# 🧪 Guia de Testes

Este documento descreve como testar o aplicativo e validar todas as funcionalidades.

## Testes Manuais

### 1. Autenticação

#### Teste 1.1: Criar Conta
- [ ] Abrir o app
- [ ] Clicar em "Criar Conta"
- [ ] Preencher e-mail válido
- [ ] Preencher senha (mínimo 6 caracteres)
- [ ] Confirmar senha
- [ ] Clicar em "Criar Conta"
- [ ] **Esperado:** Mensagem de sucesso e e-mail de verificação enviado

#### Teste 1.2: Verificar E-mail
- [ ] Abrir e-mail recebido
- [ ] Clicar no link de verificação
- [ ] **Esperado:** E-mail verificado com sucesso

#### Teste 1.3: Login
- [ ] Voltar ao app
- [ ] Fazer login com e-mail e senha
- [ ] **Esperado:** Acesso à tela principal

#### Teste 1.4: Validações
- [ ] Tentar criar conta com senha < 6 caracteres
- [ ] **Esperado:** Mensagem de erro
- [ ] Tentar login com credenciais inválidas
- [ ] **Esperado:** Mensagem de erro

### 2. Registro de Consumo

#### Teste 2.1: Transporte Terrestre
- [ ] Ir para aba "Registrar"
- [ ] Selecionar tipo de veículo: "Carro pequeno (até 1.4L) - Gasolina"
- [ ] Inserir distância: 25 km
- [ ] Clicar em "Calcular e Salvar"
- [ ] **Esperado:** Total = 4.80 kg CO₂

#### Teste 2.2: Transporte Aéreo
- [ ] Selecionar "Voo nacional (ida e volta)"
- [ ] Inserir distância: 1000 km
- [ ] Salvar
- [ ] **Esperado:** Total = 150.00 kg CO₂

#### Teste 2.3: Energia
- [ ] Inserir consumo: 100 kWh
- [ ] Salvar
- [ ] **Esperado:** Total = 8.40 kg CO₂

#### Teste 2.4: Gás
- [ ] Selecionar "Gás de cozinha (GLP)"
- [ ] Inserir consumo: 13 kg
- [ ] Salvar
- [ ] **Esperado:** Total = 38.78 kg CO₂

#### Teste 2.5: Múltiplos Consumos
- [ ] Preencher todos os campos
- [ ] Salvar
- [ ] **Esperado:** Soma correta de todas as categorias

#### Teste 2.6: Validações
- [ ] Tentar salvar sem preencher nenhum campo
- [ ] **Esperado:** Mensagem de erro
- [ ] Inserir valores negativos
- [ ] **Esperado:** Não permitir ou mostrar erro

### 3. Tela Inicial (Home)

#### Teste 3.1: Visualização de Dados
- [ ] Após registrar consumo, voltar à tela inicial
- [ ] **Esperado:** Cards mostrando emissões do dia
- [ ] Verificar breakdown por categoria
- [ ] **Esperado:** Valores corretos em cada card

#### Teste 3.2: Resumo Mensal
- [ ] Verificar card "Total do mês"
- [ ] **Esperado:** Soma de todos os dias do mês atual

#### Teste 3.3: Pull to Refresh
- [ ] Puxar a tela para baixo
- [ ] **Esperado:** Dados atualizados

#### Teste 3.4: Estado Vazio
- [ ] Limpar dados (ou testar em instalação nova)
- [ ] **Esperado:** Mensagem "Nenhum registro hoje"

### 4. Relatórios

#### Teste 4.1: Gráfico de Linha
- [ ] Registrar dados de vários dias/meses
- [ ] Ir para aba "Relatórios"
- [ ] **Esperado:** Gráfico de linha mostrando evolução

#### Teste 4.2: Gráfico de Pizza
- [ ] Verificar gráfico de distribuição
- [ ] **Esperado:** Porcentagens corretas por categoria

#### Teste 4.3: Resumo Estatístico
- [ ] Verificar tabela de resumo
- [ ] **Esperado:** Valores corretos para cada mês

#### Teste 4.4: Exportar PDF
- [ ] Clicar em "Exportar PDF"
- [ ] **Esperado:** PDF gerado e compartilhável
- [ ] Abrir PDF
- [ ] **Esperado:** Formatação correta e dados completos

#### Teste 4.5: Exportar CSV
- [ ] Clicar em "Exportar CSV"
- [ ] **Esperado:** CSV gerado
- [ ] Abrir em planilha
- [ ] **Esperado:** Dados estruturados corretamente

#### Teste 4.6: Estado Vazio
- [ ] Testar sem dados
- [ ] **Esperado:** Mensagem "Nenhum dado disponível"

### 5. Dicas Personalizadas

#### Teste 5.1: Dicas Gerais
- [ ] Ir para aba "Dicas"
- [ ] **Esperado:** Lista de dicas disponível

#### Teste 5.2: Personalização
- [ ] Registrar alto consumo de transporte
- [ ] Verificar dicas personalizadas
- [ ] **Esperado:** Dicas focadas em transporte no topo

#### Teste 5.3: Mostrar/Ocultar Todas
- [ ] Clicar em "Ver todas as dicas"
- [ ] **Esperado:** Todas as categorias expandidas
- [ ] Clicar em "Mostrar menos"
- [ ] **Esperado:** Lista recolhida

### 6. Navegação

#### Teste 6.1: Tabs
- [ ] Navegar entre todas as abas
- [ ] **Esperado:** Transições suaves
- [ ] Verificar ícones destacados
- [ ] **Esperado:** Tab ativa com cor primária

#### Teste 6.2: Fluxos
- [ ] Home → Registrar → Salvar → Ver Relatório
- [ ] **Esperado:** Navegação correta
- [ ] Dados persistidos

### 7. Persistência de Dados

#### Teste 7.1: Armazenamento Local
- [ ] Registrar dados
- [ ] Fechar app completamente
- [ ] Reabrir app
- [ ] **Esperado:** Dados ainda disponíveis

#### Teste 7.2: Logout/Login
- [ ] Fazer logout
- [ ] Fazer login novamente
- [ ] **Esperado:** Dados mantidos (localmente)

#### Teste 7.3: Histórico de 24 Meses
- [ ] Verificar limpeza automática
- [ ] **Esperado:** Dados > 24 meses removidos

## Casos de Teste com Dados Específicos

### Caso 1: Usuário Diário - Carro
```
Input:
- Tipo: Carro pequeno (1.4L) - Gasolina
- Distância: 25 km

Output Esperado:
- 25 × 0.192 = 4.80 kg CO₂
```

### Caso 2: Energia Residencial
```
Input:
- Consumo: 150 kWh (média mensal residencial)

Output Esperado:
- 150 × 0.084 = 12.60 kg CO₂
```

### Caso 3: Gás de Cozinha
```
Input:
- Tipo: GLP
- Consumo: 13 kg (1 botijão)

Output Esperado:
- 13 × 2.983 = 38.78 kg CO₂
```

### Caso 4: Voo São Paulo - Rio
```
Input:
- Tipo: Voo Nacional
- Distância: 365 km (ida e volta)

Output Esperado:
- 365 × 0.150 = 54.75 kg CO₂
```

### Caso 5: Consumo Misto
```
Input:
- Carro pequeno: 30 km
- Energia: 12 kWh
- Gás GLP: 2 kg

Cálculo:
- Transporte: 30 × 0.192 = 5.76
- Energia: 12 × 0.084 = 1.01
- Gás: 2 × 2.983 = 5.97
- TOTAL: 12.74 kg CO₂
```

## Testes de Performance

### Teste P1: Tempo de Cálculo
- [ ] Registrar consumo com todos os campos
- [ ] Medir tempo de resposta
- [ ] **Esperado:** < 2 segundos (RNF01)

### Teste P2: Renderização de Gráficos
- [ ] Abrir relatórios com 6 meses de dados
- [ ] Medir tempo de carregamento
- [ ] **Esperado:** < 3 segundos

### Teste P3: Exportação
- [ ] Exportar PDF com 100+ registros
- [ ] Medir tempo
- [ ] **Esperado:** < 10 segundos

## Testes de Compatibilidade

### Android
- [ ] Testar em Android 10
- [ ] Testar em Android 13+
- [ ] Diferentes tamanhos de tela

### iOS
- [ ] Testar em iOS 14
- [ ] Testar em iOS 17+
- [ ] iPhone e iPad

## Checklist de Regressão

Antes de cada release:

- [ ] Todos os testes de autenticação passam
- [ ] Cálculos estão corretos (usar casos de teste)
- [ ] Gráficos renderizam corretamente
- [ ] Exportação funciona
- [ ] Dados persistem corretamente
- [ ] App não crasha
- [ ] Performance aceitável
- [ ] UI responsiva em diferentes telas

## Bugs Conhecidos

### Android
- Picker pode ter aparência diferente em versões antigas

### iOS
- Safari pode bloquear compartilhamento de PDF

### Geral
- Gráficos muito pequenos em telas < 5"
- PDF grande pode demorar em dispositivos antigos

## Ferramentas de Teste

### Recomendadas
- **Expo Go** - Teste rápido em dispositivo real
- **Android Studio** - Emulador Android
- **Xcode** - Simulador iOS
- **Planilha Excel/Google Sheets** - Validar cálculos

---

**Encontrou um bug? Abra uma Issue!** 🐛
