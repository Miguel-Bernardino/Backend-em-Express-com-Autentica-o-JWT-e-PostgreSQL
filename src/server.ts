// src/index.ts
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import db from "./models/index.js";
import { errorHandler } from './middleware/errorMiddlleware.js';
import protectedRoute from "./routes/protectedRoute.js";
import taskRoutes from "./routes/taskRoutes.js";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const app = express();

dotenv.config(); // ← Carrega as variáveis do .env

// Middlewares globais
app.use(cors()); // Habilita CORS para todos os recursos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao banco PostgreSQL - com tratamento para Vercel
const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync(); 
    console.log("Database connected and synced.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    // No Vercel, não encerra o processo - permite que funções serverless tentem reconectar
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
  }
};

// Conecta ao banco
await connectDB();

app.get("/", (req: Request, res: Response) => {
  
  res.status(200).json({ 

    message: '🚀 Projeto Backend em Express com Autenticação JWT e MongoDB funcionando!',
    status: 'WORKING',
  
  });

});

// Rotas
// Rota para servir a spec JSON diretamente (útil para debugging)
app.get('/api-docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger UI (rota /docs) - com configurações para Vercel
const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'MiniProjeto API Docs',
  swaggerOptions: {
    persistAuthorization: true,
  }
};

app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerSpec, swaggerUiOptions));

app.use('/api', userRoutes);
app.use('/api', protectedRoute);
app.use('/api', taskRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Exporta o app para Vercel (serverless)
export default app;

// Inicializa o servidor Express apenas se não estiver no Vercel
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
  });
}
