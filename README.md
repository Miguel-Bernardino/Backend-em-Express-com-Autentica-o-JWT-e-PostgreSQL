# 🚀 MiniProjeto API - Express + TypeScript + PostgreSQL + JWT

API RESTful completa com autenticação JWT, gerenciamento de tarefas (tasks), documentação Swagger e suporte para deploy no Vercel.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Documentação da API](#-documentação-da-api)
- [Endpoints](#-endpoints)
- [Deploy no Vercel](#-deploy-no-vercel)
- [Docker](#-docker)
- [Estrutura do Projeto](#-estrutura-do-projeto)

---

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express** v5 - Framework web
- **TypeScript** - Superset JavaScript com tipagem

### Banco de Dados
- **PostgreSQL** - Banco relacional
- **Sequelize** - ORM para Node.js

### Autenticação & Segurança
- **JWT** (jsonwebtoken) - Autenticação via tokens
- **bcryptjs** - Hash de senhas
- **CORS** - Controle de acesso entre origens

### Documentação
- **Swagger UI Express** - Interface visual da API
- **Swagger JSDoc** - Geração de spec OpenAPI 3.0

### Ambiente & Deploy
- **dotenv** - Variáveis de ambiente
- **Vercel** - Deploy serverless
- **Docker** - Containerização (opcional)

---

## ✨ Funcionalidades

### Autenticação
- ✅ Registro de usuários com hash de senha
- ✅ Login com geração de token JWT
- ✅ Middleware de proteção de rotas
- ✅ Validação de tokens

### Gerenciamento de Tarefas (Tasks)
- ✅ Criar tarefas
- ✅ Listar tarefas do usuário (com filtros)
- ✅ Buscar tarefa por ID
- ✅ Atualização completa (PUT)
- ✅ Atualização parcial (PATCH)
- ✅ Soft delete (deletedAt)
- ✅ Restaurar tarefas deletadas

### Documentação
- ✅ Swagger UI em `/docs`
- ✅ Spec OpenAPI 3.0 em `/api-docs.json`
- ✅ Autenticação JWT integrada no Swagger
- ✅ Todos os endpoints documentados

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Miguel-Bernardino/Backend-em-Express-com-Autentica-o-JWT-e-PostgreSQL.git
cd Backend-em-Express-com-Autentica-o-JWT-e-PostgreSQL
```

### 2. Instale as dependências

```bash
npm install
```

### Dependências principais instaladas:
```bash
# Framework e TypeScript
npm install express cors dotenv
npm install -D typescript ts-node-dev @types/node @types/express @types/cors

# Banco de Dados PostgreSQL
npm install sequelize pg pg-hstore
npm install -D @types/pg @types/sequelize

# Autenticação
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

# Documentação Swagger
npm install swagger-ui-express swagger-jsdoc
```

---

## ⚙️ Configuração

### 1. Crie o arquivo `.env` na raiz do projeto

```env
# Porta do servidor
PORT=3000

# Configuração PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Chave secreta JWT (use uma string longa e aleatória)
JWT_SECRET=sua_chave_secreta_super_segura_aqui

# Ambiente
NODE_ENV=development
```

### 2. Configure o Banco de Dados

#### Opção A: PostgreSQL Local

Instale PostgreSQL e crie o banco:

```bash
# Windows (com PostgreSQL instalado)
psql -U postgres
CREATE DATABASE postgres;
```

#### Opção B: Docker (Recomendado)

```bash
docker-compose up -d
```

O `docker-compose.yml` já está configurado com PostgreSQL.

#### Opção C: Banco em Nuvem (Para produção/Vercel)

Use um destes serviços gratuitos:
- **Supabase**: https://supabase.com/
- **Neon**: https://neon.tech/
- **Railway**: https://railway.app/

---

## 🚀 Executando o Projeto

### Desenvolvimento (com hot reload)

```bash
npm run dev
```

### Build para produção

```bash
npm run build
```

### Executar versão de produção

```bash
npm start
```

### Testar com tsx

```bash
npm test
```

---

## 📚 Documentação da API

### Swagger UI

Após iniciar o servidor, acesse:

**Local:**
```
http://localhost:3000/docs
```

**Produção (Vercel):**
```
https://seu-app.vercel.app/docs
```

### Spec OpenAPI (JSON)

```
http://localhost:3000/api-docs.json
```

### Usando autenticação no Swagger

1. Faça login via endpoint `/api/login`
2. Copie o token JWT da resposta
3. Clique em **"Authorize"** no Swagger UI
4. Cole: `Bearer seu_token_aqui`
5. Agora você pode testar rotas protegidas

---

## 🔌 Endpoints

### Autenticação (User)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/register` | Registra novo usuário | ❌ Não |
| POST | `/api/login` | Faz login e retorna JWT | ❌ Não |
| GET | `/api/protected` | Rota de teste protegida | ✅ Sim |

### Tarefas (Tasks)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/tasks` | Cria nova tarefa | ✅ Sim |
| GET | `/api/tasks` | Lista tarefas do usuário | ✅ Sim |
| GET | `/api/tasks/:id` | Busca tarefa por ID | ✅ Sim |
| PUT | `/api/tasks/:id` | Atualização completa | ✅ Sim |
| PATCH | `/api/tasks/:id` | Atualização parcial | ✅ Sim |
| DELETE | `/api/tasks/:id` | Deleta tarefa (soft delete) | ✅ Sim |
| PATCH | `/api/tasks/:id/restore` | Restaura tarefa deletada | ✅ Sim |

### Exemplos de Requisição

#### Registro
```bash
POST /api/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### Login
```bash
POST /api/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### Criar Tarefa
```bash
POST /api/tasks
Authorization: Bearer seu_token_jwt_aqui
Content-Type: application/json

{
  "title": "Minha tarefa",
  "description": "Descrição da tarefa",
  "completed": false
}
```

---

## 🌐 Deploy no Vercel

### Guia Completo

Consulte o arquivo **`DEPLOY_VERCEL.md`** para instruções detalhadas.

### Resumo Rápido

1. **Configure banco PostgreSQL externo** (Supabase/Neon/Railway)

2. **Instale Vercel CLI**
   ```bash
   npm i -g vercel
   ```

3. **Faça login**
   ```bash
   vercel login
   ```

4. **Configure variáveis de ambiente no Vercel**
   - POSTGRES_HOST
   - POSTGRES_PORT
   - POSTGRES_USER
   - POSTGRES_PASSWORD
   - POSTGRES_DATABASE
   - JWT_SECRET
   - NODE_ENV=production

5. **Deploy**
   ```bash
   vercel --prod
   ```

### Arquivos de Configuração

- `vercel.json` - Configuração do Vercel
- `.vercelignore` - Arquivos ignorados no deploy
- `DEPLOY_VERCEL.md` - Guia completo de deploy
- `SWAGGER_VERCEL.md` - Troubleshooting do Swagger

---

## 🐳 Docker

### Iniciar containers

```bash
docker-compose up -d
```

### Parar containers

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f
```

O `docker-compose.yml` configura:
- PostgreSQL na porta 5432
- Volumes persistentes para dados

---

## 📁 Estrutura do Projeto

```
projeto/
├── src/
│   ├── server.ts                 # Entry point (exporta app para Vercel)
│   ├── swagger.ts                # Configuração Swagger/OpenAPI
│   ├── config/
│   │   └── db.config.ts          # Configuração Sequelize
│   ├── controllers/
│   │   ├── userController.ts     # Login/Register
│   │   ├── taskController.ts     # CRUD de tarefas
│   │   └── protectedController.ts
│   ├── middleware/
│   │   ├── protectedMiddleware.ts # Validação JWT
│   │   └── errorMiddleware.ts     # Tratamento de erros
│   ├── models/
│   │   ├── index.ts              # Inicialização Sequelize
│   │   ├── User.ts               # Model de usuário
│   │   └── Task.ts               # Model de tarefa
│   ├── routes/
│   │   ├── userRoutes.ts         # Rotas de autenticação
│   │   ├── taskRoutes.ts         # Rotas de tarefas
│   │   └── protectedRoute.ts     # Rota protegida de teste
│   ├── services/
│   │   ├── userService.ts        # Lógica de negócio (usuário)
│   │   └── taskServices.ts       # Lógica de negócio (tarefas)
│   └── types/
│       ├── environment.d.ts      # Tipagem de variáveis de ambiente
│       └── swagger.d.ts          # Declarações Swagger
├── requests/
│   └── request.yml               # Exemplos de requisições
├── .env                          # Variáveis de ambiente (não commitado)
├── .gitignore
├── .vercelignore                 # Arquivos ignorados no Vercel
├── docker-compose.yml            # Configuração Docker
├── Dockerfile
├── package.json
├── tsconfig.json                 # Configuração TypeScript
├── vercel.json                   # Configuração Vercel
├── DEPLOY_VERCEL.md             # Guia de deploy
├── SWAGGER_VERCEL.md            # Troubleshooting Swagger
└── README.md                    # Este arquivo
```

---

## 🔒 Segurança

- ✅ Senhas hashadas com bcrypt
- ✅ Tokens JWT com expiração
- ✅ Validação de entrada nos controllers
- ✅ CORS configurado
- ✅ Variáveis sensíveis em `.env`
- ✅ `.env` no `.gitignore`

---

## 🧪 Testando a API

### Com Swagger UI
1. Acesse `/docs`
2. Teste diretamente na interface

### Com cURL
```bash
# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"senha123"}'

# Criar tarefa
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"title":"Tarefa 1","description":"Descrição","completed":false}'
```

### Com Postman/Insomnia
Importe a spec OpenAPI de `/api-docs.json`

---

## 📝 Scripts Disponíveis

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "tsx watch src/server.ts"
}
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença especificada no arquivo `LICENSE`.

---

## 👨‍💻 Autor

**Miguel Bernardino**

- GitHub: [@Miguel-Bernardino](https://github.com/Miguel-Bernardino)

---

## 🆘 Suporte

- **Problemas com Swagger no Vercel?** → Veja `SWAGGER_VERCEL.md`
- **Problemas com Deploy?** → Veja `DEPLOY_VERCEL.md`
- **Issues**: https://github.com/Miguel-Bernardino/Backend-em-Express-com-Autentica-o-JWT-e-PostgreSQL/issues

---

## 🎯 Roadmap

- [ ] Testes unitários (Jest)
- [ ] Testes de integração
- [ ] Rate limiting
- [ ] Refresh tokens
- [ ] Paginação nas listagens
- [ ] Validação com Zod/Joi
- [ ] CI/CD com GitHub Actions
- [ ] Logs estruturados (Winston/Pino)

---

**⭐ Se este projeto foi útil, deixe uma estrela no repositório!**
