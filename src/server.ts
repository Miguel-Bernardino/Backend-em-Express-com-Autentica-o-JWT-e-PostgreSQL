// src/index.ts
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import userRoutes from './routes/userRoutes.js';
import db from "./models/index.js";
import { errorHandler } from './middleware/errorMiddlleware.js';
import protectedRoute from "./routes/protectedRoute.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

dotenv.config(); // ← Carrega as variáveis do .env

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao banco PostgreSQL Atlas
try {

  await db.sequelize.authenticate();
  await db.sequelize.sync(); 
  console.log("Database connected and synced.");

} catch (err) {
  console.error("Unable to connect to the database:", err);
  process.exit(1);
}

// Porta definida no .env ou 3000 por padrão
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  
  res.status(200).json({ 

    message: '🚀 Projeto Backend em Express com Autenticação JWT e MongoDB funcionando!',
    status: 'WORKING',
  
  });

});

// Rotas
app.use('/api', userRoutes);
app.use('/api', protectedRoute);
app.use('/api', taskRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicializa o servidor Express
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
