# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para a Calculadora de Pegada de Carbono!

## Como Contribuir

### Reportar Bugs

1. Verifique se o bug já foi reportado nas Issues
2. Se não, crie uma nova Issue incluindo:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots (se aplicável)
   - Versão do app e dispositivo

### Sugerir Melhorias

1. Abra uma Issue com a tag "enhancement"
2. Descreva claramente a melhoria
3. Explique por que seria útil
4. Se possível, sugira uma implementação

### Contribuir com Código

1. **Fork o Projeto**
```bash
git clone https://github.com/seu-usuario/mobile-tcc.git
cd mobile-tcc
```

2. **Crie uma Branch**
```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bug-fix
```

3. **Faça suas Alterações**
   - Siga os padrões de código existentes
   - Comente código complexo
   - Mantenha funções pequenas e focadas
   - Use nomes descritivos para variáveis

4. **Teste suas Alterações**
   - Execute o app e teste manualmente
   - Verifique se não quebrou funcionalidades existentes
   - Teste em Android e iOS se possível

5. **Commit suas Alterações**
```bash
git add .
git commit -m "feat: adiciona funcionalidade X"
```

**Padrão de Commits:**
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `style:` formatação, sem mudança de código
- `refactor:` refatoração de código
- `test:` adicionar/modificar testes
- `chore:` tarefas de manutenção

6. **Push para o GitHub**
```bash
git push origin feature/minha-feature
```

7. **Abra um Pull Request**
   - Descreva claramente as mudanças
   - Referencie Issues relacionadas
   - Aguarde review

## Padrões de Código

### JavaScript/React
- Use componentes funcionais com Hooks
- Prefira const sobre let
- Use destructuring quando apropriado
- Mantenha componentes pequenos (< 300 linhas)

### Nomenclatura
- Componentes: PascalCase (`Button.js`)
- Funções: camelCase (`calculateEmissions`)
- Constantes: UPPER_SNAKE_CASE (`EMISSION_FACTORS`)
- Arquivos: camelCase ou PascalCase

### Estrutura de Arquivos
```
src/
├── components/    # Componentes reutilizáveis
├── screens/       # Telas completas
├── services/      # Lógica de negócio
├── constants/     # Dados estáticos
├── contexts/      # React Contexts
├── navigation/    # Configuração de rotas
└── utils/         # Funções auxiliares
```

### Estilo e UI
- Use constantes de cores de `src/constants/colors.js`
- Mantenha consistência visual
- Teste em diferentes tamanhos de tela
- Considere acessibilidade

## Áreas que Precisam de Ajuda

- [ ] Testes automatizados
- [ ] Internacionalização (i18n)
- [ ] Modo offline
- [ ] Performance e otimizações
- [ ] Documentação
- [ ] Acessibilidade

## Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Demonstre empatia

## Dúvidas?

- Abra uma Issue
- Entre em contato com os mantenedores

---

**Obrigado por contribuir! 🌱**
