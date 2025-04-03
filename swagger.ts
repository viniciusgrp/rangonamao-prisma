import { SwaggerOptions } from 'swagger-ui-express';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RNM API Documentation',
    version: '1.0.0',
    description: 'API documentation for the RNM (Rede Nacional de Mercados) application',
  },
  servers: [
    {
      url: 'http://localhost:3022',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.ts'], // Path to the API routes
};

export default swaggerOptions;
