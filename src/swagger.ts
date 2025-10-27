import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Detecta a URL de produção do Vercel automaticamente
const productionUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api`
  : process.env.PRODUCTION_URL || 'https://your-app.vercel.app/api';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MiniProjeto API',
      version: '1.0.0',
      description: 'Documentação da API - MiniProjeto (Express + JWT + PostgreSQL)'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}/api`, description: 'Local server' },
      { url: productionUrl, description: 'Production server' }
    ]
  },
  // paths to files containing OpenAPI definitions (JSDoc)
  // Usa caminhos absolutos para funcionar no Vercel
  apis: [
    join(__dirname, 'routes', '*.ts'),
    join(__dirname, 'controllers', '*.ts'),
    join(__dirname, 'routes', '*.js'),
    join(__dirname, 'controllers', '*.js')
  ]
};

export const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
