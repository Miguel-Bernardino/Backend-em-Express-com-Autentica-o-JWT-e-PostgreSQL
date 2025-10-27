import swaggerJSDoc from 'swagger-jsdoc';

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
  // Escaneia tanto .ts (sem build) quanto .js (com build) para funcionar em dev e produção
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './dist/routes/*.js',
    './dist/controllers/*.js'
  ]
};

export const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
