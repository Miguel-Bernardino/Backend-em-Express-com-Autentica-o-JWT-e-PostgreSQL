# Configuração do Swagger para Vercel

## Problema
O Swagger UI pode não renderizar corretamente no Vercel devido a limitações de funções serverless e carregamento de recursos estáticos.

## Soluções Aplicadas

### 1. Configuração do Swagger UI
- Separação de `swaggerUi.serve` e `swaggerUi.setup()`
- Adição de opções customizadas para melhor compatibilidade
- CSS customizado para ocultar topbar desnecessária

### 2. Rota JSON da Spec
Adicionada rota `/api-docs.json` que serve a especificação OpenAPI em JSON puro.
Útil para:
- Debugging
- Importar em outras ferramentas (Postman, Insomnia)
- Verificar se a spec está sendo gerada corretamente

### 3. CORS Habilitado
Adicionado middleware CORS para garantir que recursos sejam carregados corretamente.

### 4. Configuração do Vercel
Criado `vercel.json` com:
- Build apontando para `dist/server.js`
- Rotas direcionando tudo para o servidor
- Variável de ambiente `NODE_ENV=production`

### 5. Paths Dinâmicos
O `swagger.ts` agora detecta o ambiente:
- **Dev**: lê arquivos `.ts` de `./src/routes/`
- **Prod**: lê arquivos `.js` de `./dist/routes/`

## Como Atualizar a URL do Servidor no Vercel

Edite `src/swagger.ts` e substitua `https://your-app.vercel.app/api` pela sua URL real do Vercel:

```typescript
servers: [
  { url: `http://localhost:${process.env.PORT || 3000}/api`, description: 'Local server' },
  { url: 'https://SEU-APP.vercel.app/api', description: 'Production server' }
]
```

## Alternativa: Usar Swagger Externo

Se o problema persistir no Vercel, considere:

1. **Redoc**: UI alternativa mais leve
```bash
npm install redoc-express
```

2. **Swagger Editor Online**: 
   - Acesse https://editor.swagger.io/
   - Faça fetch da sua spec em `https://seu-app.vercel.app/api-docs.json`

3. **Deploy separado do Swagger UI**:
   - Use GitHub Pages ou Netlify para hospedar apenas a UI
   - Configure para consumir sua API

## Testando Localmente

```bash
# Desenvolvimento
npm run dev

# Build para produção (simular Vercel)
npm run build
NODE_ENV=production npm start
```

Acesse:
- UI: http://localhost:3000/docs
- Spec JSON: http://localhost:3000/api-docs.json

## Deploy no Vercel

```bash
# Fazer build antes do deploy
npm run build

# Garantir que dist/ existe e vercel.json está configurado
vercel --prod
```

## Troubleshooting

### Swagger UI carrega mas sem estilos
- Verifique se CORS está habilitado
- Confirme que `swaggerUi.serve` está antes de `setup()`

### Rotas não aparecem na UI
- Verifique `api-docs.json` para ver se a spec foi gerada
- Confirme que os comentários JSDoc estão corretos
- Em produção, verifique se os arquivos `.js` existem em `dist/`

### Erro 404 no /docs
- Confirme que o servidor está rodando
- Verifique logs do Vercel para erros de build
- Teste localmente primeiro com `NODE_ENV=production npm start`
