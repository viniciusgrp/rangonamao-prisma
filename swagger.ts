import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RNM',
      version: '1.0.0',
      description: 'Documentação da API do sistema RNM',
    },
    servers: [
      {
        url: 'http://localhost:3022',
        description: 'Servidor de Desenvolvimento',
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
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./routes/*.ts'], // Caminho para os arquivos de rotas que contêm as anotações do Swagger
};

const specs = swaggerJsdoc(options);

export default specs;
