# Configuração do Swagger para Vercel

## Problema Resolvido ✅
O erro `404: NOT_FOUND` no Vercel foi corrigido com as seguintes mudanças:

### Correções Aplicadas

1. **Exportação do App Express** (`src/server.ts`)
   - Agora exporta `export default app` para Vercel
   - O `app.listen()` só executa localmente (não no Vercel)
   - Vercel detecta automaticamente via `process.env.VERCEL`

2. **Configuração Vercel Atualizada** (`vercel.json`)
   - Source aponta para `src/server.ts` (não `dist/`)
   - Vercel compila TypeScript automaticamente
   - Build command configurado

3. **Conexão DB Resiliente**
   - Não encerra processo em caso de erro no Vercel
   - Permite que funções serverless tentem reconectar

## Como Configurar no Vercel

### 1. Variáveis de Ambiente

Adicione no dashboard do Vercel (Settings → Environment Variables):

```
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DATABASE=postgres
POSTGRES_HOST=seu_host.com
POSTGRES_PORT=5432
JWT_SECRET=sua_chave_secreta_aqui
NODE_ENV=production
```

⚠️ **IMPORTANTE**: Use um banco PostgreSQL externo (não localhost):
- Supabase (grátis): https://supabase.com/
- Neon (grátis): https://neon.tech/
- Railway (grátis): https://railway.app/
- Render (grátis): https://render.com/

### 2. Deploy

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Testando

Após deploy, acesse:
- Raiz: `https://seu-app.vercel.app/`
- Swagger UI: `https://seu-app.vercel.app/docs`
- Spec JSON: `https://seu-app.vercel.app/api-docs.json`
- API: `https://seu-app.vercel.app/api/login`

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

## Estrutura de Arquivos para Vercel

```
projeto/
├── src/
│   ├── server.ts          ← Entry point (exporta app)
│   ├── swagger.ts         ← Config do Swagger
│   ├── routes/            ← Rotas com JSDoc
│   └── ...
├── vercel.json            ← Config do Vercel
├── .vercelignore          ← Arquivos ignorados
├── package.json
└── tsconfig.json
```

## Troubleshooting

### Erro 404: NOT_FOUND
✅ **Resolvido** - `server.ts` agora exporta o app corretamente

### Banco de dados não conecta
- Verifique se as variáveis de ambiente estão corretas no Vercel
- Use um banco PostgreSQL externo (não localhost)
- Teste a conexão localmente primeiro com as mesmas credenciais

### Swagger UI sem estilos
- Verifique `/api-docs.json` - se funcionar, o problema é só CSS
- Tente limpar cache do navegador
- Use rota alternativa: `https://editor.swagger.io/` + importe `/api-docs.json`

### Rotas não aparecem
- Confirme que JSDoc está correto nos arquivos de rotas
- Verifique se `src/routes/*.ts` tem os comentários `@openapi`
- Acesse `/api-docs.json` para ver se a spec foi gerada

### Timeout no Vercel
- Funções serverless no Vercel têm limite de 10s (free tier)
- Otimize queries do banco
- Considere usar cache

## Alternativas ao Swagger UI no Vercel

Se ainda houver problemas com UI:

### 1. Redoc (mais leve)
```bash
npm install redoc-express
```

```typescript
import redoc from 'redoc-express';

app.get('/docs', redoc({
  title: 'MiniProjeto API',
  specUrl: '/api-docs.json'
}));
```

### 2. Swagger Editor Online
- Acesse: https://editor.swagger.io/
- Importe: `https://seu-app.vercel.app/api-docs.json`

### 3. Postman/Insomnia
- Importe a collection via `/api-docs.json`

## Monitoramento

Logs do Vercel:
```bash
vercel logs
```

Ou veja no dashboard: https://vercel.com/dashboard

## Checklist de Deploy

- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Banco PostgreSQL externo configurado
- [ ] `vercel.json` presente no projeto
- [ ] `server.ts` exporta o app
- [ ] Build local funciona (`npm run build`)
- [ ] Testado localmente com `NODE_ENV=production`
- [ ] Deploy executado (`vercel --prod`)
- [ ] Rotas `/docs` e `/api-docs.json` funcionando
