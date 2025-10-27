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
  // Use .js para produção (após build) e .ts para dev
  apis: process.env.NODE_ENV === 'production' 
    ? ['./dist/routes/*.js', './dist/controllers/*.js']
    : ['./src/routes/*.ts', './src/controllers/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
