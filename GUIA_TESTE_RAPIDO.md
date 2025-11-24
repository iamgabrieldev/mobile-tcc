# 🧪 Guia de Teste Rápido - Novas Funcionalidades

## ✅ Checklist de Testes

### 1. Atividades Domésticas (RegisterScreen)

**Como testar**:

1. ✅ Abra o app
2. ✅ Navegue para "Registrar Consumo"
3. ✅ Role até "Atividades Domésticas"
4. ✅ Selecione "Banho quente (10 minutos)"
5. ✅ Digite quantidade: `2`
6. ✅ Clique em "Calcular e Salvar"

**Resultado esperado**:
```
✓ Alert mostra emissões calculadas
✓ Mensagem inclui número de árvores
✓ Exemplo: "Total: 4.0 kg CO₂"
✓ Exemplo: "🌳 67 árvores seriam necessárias..."
```

**Teste as outras atividades**:
- Lavagem de roupas (1 ciclo) → 0.275 kg CO₂
- Secadora de roupas (1 ciclo) → 1.0 kg CO₂
- Forno elétrico (1,5 kWh) → 0.126 kg CO₂
- Consumo de alimentos → 4.5 kg CO₂

---

### 2. Resíduos/Reciclagem (RegisterScreen)

**Como testar**:

1. ✅ Na tela "Registrar Consumo"
2. ✅ Role até "Resíduos/Reciclagem"
3. ✅ Selecione "Reciclagem de papel"
4. ✅ Digite quantidade: `5` kg
5. ✅ Clique em "Calcular e Salvar"

**Resultado esperado**:
```
✓ Valor reduz emissões totais
✓ Exemplo: Se tinha 10 kg, vai para 1 kg (10 - 5*1.8)
✓ Mensagem: "♻️ Reciclagem reduz suas emissões!"
```

**Teste os outros materiais**:
- Plástico → Reduz 1.5 kg CO₂ por kg
- Vidro → Reduz 0.315 kg CO₂ por kg
- Metal → Reduz 9.0 kg CO₂ por kg

---

### 3. Compensação por Árvores (HomeScreen)

**Como testar**:

1. ✅ Navegue para a tela inicial (Home)
2. ✅ Verifique se já tem registros do mês atual
3. ✅ Role até encontrar "🌳 Compensação Ambiental"
4. ✅ Puxe para baixo para atualizar (pull-to-refresh)

**Resultado esperado**:
```
✓ Card mostra número de árvores
✓ Exemplo: "86 árvores"
✓ Mostra emissão anual projetada
✓ Mostra mensagem motivacional
✓ Informação: "Uma árvore absorve ~22 kg CO₂/ano"
```

**Se não aparecer**:
- Registre um consumo primeiro
- Atualize a tela puxando para baixo

---

### 4. Árvores nos Relatórios (ReportsScreen)

**Como testar**:

1. ✅ Navegue para "Relatórios"
2. ✅ Verifique os gráficos
3. ✅ Role até o final
4. ✅ Procure seção "🌳 Compensação Ambiental"

**Resultado esperado**:
```
✓ Card após resumo estatístico
✓ Mostra árvores baseadas no último mês
✓ Design igual ao da HomeScreen
```

---

### 5. Sugestões de Árvores (TipsScreen)

**Como testar**:

1. ✅ Navegue para "Dicas"
2. ✅ Role até encontrar card verde
3. ✅ Procure "🌳 Compensação por Árvores"
4. ✅ Verifique as sugestões

**Resultado esperado**:
```
✓ Card com fundo verde claro (#E8F5E9)
✓ Sugestões com ícones (🚌 🥗 💡 🌱)
✓ Cada sugestão mostra impacto
✓ Informação sobre absorção de CO₂
```

**Sugestões esperadas** (dependendo das emissões):
- Use transporte público
- Reduza o consumo de carne
- Economize energia em casa
- Plante uma árvore!

---

### 6. Exibição na Home (Novas Categorias)

**Como testar**:

1. ✅ Registre atividade doméstica
2. ✅ Volte para Home
3. ✅ Verifique "Emissões de Hoje"

**Resultado esperado**:
```
✓ Cards aparecem condicionalmente
✓ Se registrou domésticas: Card roxo aparece
✓ Se registrou reciclagem: Card verde aparece
✓ Ícones: home (domésticas), recycle (resíduos)
```

---

### 7. Gráficos Atualizados (ReportsScreen)

**Como testar**:

1. ✅ Navegue para "Relatórios"
2. ✅ Verifique gráfico de pizza
3. ✅ Procure novas categorias

**Resultado esperado**:
```
✓ "Atividades Domésticas" em roxo
✓ "Resíduos/Reciclagem" em verde
✓ Valores calculados corretamente
✓ Só aparecem se tiver dados
```

---

## 🎯 Teste Completo - Fluxo Completo

### Cenário: Usuário Sustentável

**Passo 1**: Registrar Consumo Misto

```
1. Vá para "Registrar Consumo"

2. Preencha:
   - Transporte: Carro pequeno, 10 km
   - Energia: 5 kWh
   - Atividades Domésticas: 2 banhos quentes
   - Reciclagem: 3 kg de papel

3. Clique em "Calcular e Salvar"
```

**Resultado esperado**:
```
Cálculo:
- Transporte: 10 * 0.192 = 1.92 kg CO₂
- Energia: 5 * 0.084 = 0.42 kg CO₂
- Domésticas: 2 * 2.0 = 4.0 kg CO₂
- Reciclagem: 3 * (-1.8) = -5.4 kg CO₂

Total: 1.92 + 0.42 + 4.0 - 5.4 = 0.94 kg CO₂

Alert mostra:
✓ "Total de emissões: 0.94 kg CO₂"
✓ "+50 pontos ganhos!" (ou similar)
✓ "🌳 16 árvores seriam necessárias..."
```

**Passo 2**: Verificar Home

```
1. Vá para Home
2. Verifique seção "Emissões de Hoje"
```

**Resultado esperado**:
```
✓ Total: 0.94 kg CO₂
✓ 4 cards: Transporte, Energia, Domésticas, Reciclagem
✓ Seção "Compensação Ambiental" aparece
✓ Número de árvores calculado
```

**Passo 3**: Verificar Relatórios

```
1. Vá para "Relatórios"
2. Verifique gráficos
3. Role até o final
```

**Resultado esperado**:
```
✓ Gráfico de pizza com todas categorias
✓ Cores corretas (roxo, verde, etc.)
✓ Resumo estatístico atualizado
✓ Card de árvores aparece
```

**Passo 4**: Verificar Dicas

```
1. Vá para "Dicas"
2. Procure seção de árvores
```

**Resultado esperado**:
```
✓ Card verde com sugestões
✓ Sugestões relevantes
✓ Informação educativa
```

---

## 🐛 Troubleshooting

### Problema: Não aparece seção de árvores

**Solução**:
1. Verifique se há registros do mês atual
2. Puxe para baixo para atualizar (Home)
3. Navegue para outra tela e volte

### Problema: Reciclagem não reduz emissões

**Solução**:
1. Verifique se preencheu a quantidade
2. Confirme que o material está selecionado
3. O valor deve aparecer negativo no breakdown

### Problema: Cards não aparecem na Home

**Solução**:
1. Verifique se registrou hoje
2. Confirme que preencheu as categorias
3. Atualize a tela

---

## ✅ Checklist Final

Antes de considerar concluído, verifique:

- [ ] ✅ Registrou atividade doméstica
- [ ] ✅ Registrou reciclagem
- [ ] ✅ Viu redução de emissões por reciclagem
- [ ] ✅ Viu card de árvores na Home
- [ ] ✅ Viu card de árvores nos Relatórios
- [ ] ✅ Viu sugestões nas Dicas
- [ ] ✅ Alert mostra número de árvores
- [ ] ✅ Gráficos mostram novas categorias
- [ ] ✅ Cores estão corretas (roxo e verde)
- [ ] ✅ Pull-to-refresh funciona

---

## 📊 Valores para Teste Rápido

Use estes valores para testes rápidos:

### Atividades Domésticas

```
2 banhos → 4.0 kg CO₂
3 lavagens → 0.825 kg CO₂
1 secadora → 1.0 kg CO₂
2 usos forno → 0.252 kg CO₂
1 dia alimentos → 4.5 kg CO₂
```

### Reciclagem

```
5 kg papel → -9.0 kg CO₂ (redução)
3 kg plástico → -4.5 kg CO₂ (redução)
2 kg vidro → -0.63 kg CO₂ (redução)
1 kg metal → -9.0 kg CO₂ (redução)
```

### Árvores Necessárias (exemplos)

```
50 kg CO₂/mês → 28 árvores
100 kg CO₂/mês → 55 árvores
150 kg CO₂/mês → 82 árvores
200 kg CO₂/mês → 110 árvores
```

---

## 🎓 Dicas de Teste

1. **Teste gradualmente**: Primeiro uma categoria, depois outra
2. **Use valores redondos**: Facilita verificação mental
3. **Anote resultados**: Compare com valores esperados
4. **Teste casos extremos**: Zero, valores negativos, valores muito altos
5. **Teste navegação**: Entre telas, volte, atualize

---

## 📱 Screenshots Sugeridos

Para documentação, tire screenshots de:

1. ✅ Tela de registro com atividades domésticas
2. ✅ Tela de registro com reciclagem
3. ✅ Alert com número de árvores
4. ✅ Home com card de compensação
5. ✅ Relatórios com gráficos atualizados
6. ✅ Dicas com sugestões de árvores

---

## 🚀 Pronto para Produção!

Se todos os testes passaram:

- ✅ Funcionalidade está completa
- ✅ Integração está funcionando
- ✅ Interface está responsiva
- ✅ Cálculos estão corretos
- ✅ Mensagens estão claras

**Parabéns! O sistema está 100% funcional! 🎉🌳**

---

*Desenvolvido com 🌱 para um planeta mais verde!*

