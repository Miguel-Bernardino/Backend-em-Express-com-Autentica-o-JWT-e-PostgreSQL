# 🚀 Guia Rápido - Deploy no Vercel

## ⚠️ ANTES DE FAZER DEPLOY

### 1. Configure um Banco PostgreSQL Externo

O Vercel **NÃO** aceita `localhost`. Use um destes serviços gratuitos:

- **Supabase** (Recomendado): https://supabase.com/
  - 500MB grátis
  - Interface visual
  - Backups automáticos

- **Neon**: https://neon.tech/
  - 3GB grátis
  - Serverless PostgreSQL
  - Muito rápido

- **Railway**: https://railway.app/
  - $5 crédito grátis/mês
  - Simples de usar

### 2. Obtenha as Credenciais do Banco

Depois de criar o banco, copie:
- Host (ex: `db.xyz.supabase.co`)
- Port (geralmente `5432`)
- Database name
- User
- Password

## 📋 Passo a Passo do Deploy

### 1. Instale Vercel CLI

```powershell
npm install -g vercel
```

### 2. Faça Login

```powershell
vercel login
```

### 3. Configure Variáveis de Ambiente no Vercel

No terminal, na pasta do projeto:

```powershell
vercel
```

Quando perguntar sobre variáveis, adicione:

Ou vá no dashboard depois: https://vercel.com/dashboard → seu projeto → Settings → Environment Variables

Adicione estas variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `POSTGRES_HOST` | `seu-host.com` | Production, Preview, Development |
| `POSTGRES_PORT` | `5432` | Production, Preview, Development |
| `POSTGRES_USER` | `seu_usuario` | Production, Preview, Development |
| `POSTGRES_PASSWORD` | `sua_senha` | Production, Preview, Development |
| `POSTGRES_DATABASE` | `postgres` | Production, Preview, Development |
| `JWT_SECRET` | `sua_chave_secreta_longa` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### 4. Faça o Deploy

```powershell
vercel --prod
```

### 5. Teste

Após deploy, você verá uma URL tipo:
```
https://seu-projeto.vercel.app
```

Teste:
- Root: `https://seu-projeto.vercel.app/`
- Swagger: `https://seu-projeto.vercel.app/docs`
- API JSON: `https://seu-projeto.vercel.app/api-docs.json`
- Login: `https://seu-projeto.vercel.app/api/login`

## 🔧 Comandos Úteis

```powershell
# Ver logs em tempo real
vercel logs

# Ver últimos logs
vercel logs --follow

# Listar deploys
vercel ls

# Remover projeto
vercel remove
```

## ✅ Checklist Final

Antes de fazer deploy, certifique-se:

- [ ] Banco PostgreSQL externo criado e acessível
- [ ] Credenciais do banco testadas localmente
- [ ] JWT_SECRET gerado (use string longa e aleatória)
- [ ] `vercel.json` existe na raiz do projeto
- [ ] `.vercelignore` existe na raiz do projeto
- [ ] `src/server.ts` exporta o app (`export default app`)
- [ ] Testado localmente: `npm run dev` funciona
- [ ] Código commitado no Git (opcional, mas recomendado)

## 🐛 Problemas Comuns

### "Cannot connect to database"
- Verifique se as variáveis de ambiente estão corretas no Vercel
- Teste a conexão localmente com as mesmas credenciais
- Certifique-se que o banco aceita conexões externas

### "404 Not Found"
✅ **JÁ CORRIGIDO** - O projeto está configurado corretamente

### "Function execution timeout"
- Vercel free tier: 10s timeout
- Otimize queries pesadas
- Adicione índices no banco

### "Module not found"
- Execute `npm install` localmente
- Certifique-se que todas as dependências estão em `package.json`
- Não use `devDependencies` para código de produção

## 📊 Monitoramento

Veja estatísticas no dashboard:
- https://vercel.com/dashboard
- Analytics
- Logs
- Performance

## 🔄 Atualizando o Deploy

Sempre que fizer mudanças:

```powershell
git add .
git commit -m "suas mudanças"
vercel --prod
```

Ou configure deploy automático via GitHub no dashboard do Vercel.

## 💡 Dicas

1. **Use variáveis de ambiente** para tudo que for sensível
2. **Teste localmente** antes de fazer deploy
3. **Monitore logs** após deploy para ver erros
4. **Use `console.log`** estrategicamente (aparece nos logs do Vercel)
5. **Configure domínio customizado** no dashboard (opcional)

## 🆘 Precisa de Ajuda?

- Documentação Vercel: https://vercel.com/docs
- Logs: `vercel logs --follow`
- Support: https://vercel.com/support
