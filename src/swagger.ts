import swaggerJSDoc from 'swagger-jsdoc';

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
      { url: `http://localhost:${process.env.PORT || 3000}/api`, description: 'Local server' }
    ]
  },
  // paths to files containing OpenAPI definitions (JSDoc)
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
