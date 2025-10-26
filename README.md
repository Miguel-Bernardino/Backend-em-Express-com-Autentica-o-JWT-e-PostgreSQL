# ⚙️ Instalação de Dependências

Este guia descreve apenas os passos para instalar as dependências necessárias do projeto **Express + TypeScript**.

---

## 📦 1. Inicializar o projeto Node.js

No terminal, execute:

```bash

### instala o express 
npm install express

### adiciona o express ao ts
npm install -D typescript ts-node-dev @types/node @types/express

### instala o mongoDB 
npm install mongoose
npm install -D @types/mongoose

### instalacao do dotenv
npm install dotenv

### instalacao do bcryptjs
npm install bcryptjs
npm install --save-dev @types/bcryptjs

### instalacao do JWT
npm install jsonwebtoken
npm install -D @types/jsonwebtoken

### DOCKER

#Criar arquivo DockerFile(sem extensão) e docker-compose.yml

###Apos criar use os comandos abaixo
docker-compose up -d

###executar o comando abaixo para rodar o codigo
npm run dev



