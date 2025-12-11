const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentation for the API",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Roles",
      description: "Operations related to roles",
    },
    {
      name: "Products",
      description: "Operations related to products",
    },
    {
      name: "default",
      description: "Operations related to users",
    },
    {
      name: "Auth",
      description: "Operations related to Auth",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4caa",
          },
          name: {
            type: "string",
            example: "Auriculares G2",
          },
          description: {
            type: "string",
            example:
              "Auriculares Bluetooth con cancelación de ruido y batería de larga duración",
          },
          price: {
            type: "number",
            example: 120,
          },
          stock: {
            type: "integer",
            example: 50,
          },
          category: {
            type: "string",
            example: "Audio",
          },
          brand: {
            type: "string",
            example: "Prueba",
          },
          imageUrl: {
            type: "string",
            format: "uri",
            example:
              "https://images.unsplash.com/photo-1580894894513-79f1f3c6c9b3",
          },
        },
      },
      ProductInput: {
        type: "object",
        required: [
          "name",
          "description",
          "price",
          "stock",
          "category",
          "brand",
          "imageUrl",
        ],
        properties: {
          name: {
            type: "string",
            example: "Auriculares G2",
          },
          description: {
            type: "string",
            example:
              "Auriculares Bluetooth con cancelación de ruido y batería de larga duración",
          },
          price: {
            type: "number",
            example: 120,
          },
          stock: {
            type: "integer",
            example: 50,
          },
          category: {
            type: "string",
            example: "Audio",
          },
          brand: {
            type: "string",
            example: "Prueba",
          },
          imageUrl: {
            type: "string",
            format: "uri",
            example:
              "https://images.unsplash.com/photo-1580894894513-79f1f3c6c9b3",
          },
        },
      },
      Role: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4caa",
          },
          name: {
            type: "string",
            example: "Customer",
          },
        },
      },
      RoleInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Customer",
          },
        },
      },

      
      Auth: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4caa",
          },
          name: {
            type: "string",
            example: "Customer",
          },
          password: {
            type: "string",
            format: "password",
            example: "123456",
          },
        },
      },
      AuthInput: {
        type: "object",
        required: ["name", "password"],
        properties: {
          name: { type: "string", example: "Customer" },
          password: {
            type: "string",
            format: "password",
            example: "password123",
          },
        },
      },

      AuthResponse: {
        type: "object",
        properties: {
          id: { type: "string", example: "60c72b2f9b1e8a001f8e4caa" },
          name: { type: "string", example: "Customer" },
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
        },
      },


      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4caa",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "jhon.doe@example.com",
          },
          roles: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["user"],
          },
        },
      },
      UserInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "jhon.doe@exmaple.com",
          },
          password: {
            type: "string",
            example: "password123",
          },
          roles: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["user"],
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/presentation/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
