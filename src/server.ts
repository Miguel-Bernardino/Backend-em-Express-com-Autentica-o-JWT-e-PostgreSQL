// src/index.ts
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import db from "./models/index.js";
import { errorHandler } from './middleware/errorMiddlleware.js';
import protectedRoute from "./routes/protectedRoute.js";
import taskRoutes from "./routes/taskRoutes.js";
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

    message: '🚀 Projeto Backend em Express com Autenticação JWT e PostgreSQL funcionando!',
    status: 'WORKING',
  
  });

});

// Rotas
// Rota para servir a spec JSON diretamente (útil para debugging e Vercel)
app.get('/api-docs.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.get('/api-docs/swagger.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger UI via CDN (compatível com Vercel)
app.get(['/docs', '/api-docs'], (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!doctype html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MiniProjeto API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css" />
    <style>
      html { box-sizing: border-box; overflow-y: scroll; }
      *, *:before, *:after { box-sizing: inherit; }
      body { margin: 0; padding: 0; }
      .swagger-ui .topbar { display: none; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = function () {
        const ui = SwaggerUIBundle({
          url: window.location.origin + '/api-docs/swagger.json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          plugins: [SwaggerUIBundle.plugins.DownloadUrl],
          layout: 'StandaloneLayout'
        });
        window.ui = ui;
      };
    </script>
  </body>
  </html>`);
});

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
