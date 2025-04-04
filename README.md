# RNM Backend

Backend do Rango Na Mão, uma plataforma para deliveries.

## Tecnologias

- Node.js
- Express
- Prisma (ORM)
- PostgreSQL
- TypeScript
- JWT para autenticação

## Estrutura do Projeto

```
backend/
├── controllers/     # Controladores da aplicação
├── models/         # Modelos e lógica de negócios
├── routes/         # Rotas da API
├── middleware/     # Middlewares (auth, validação, etc)
├── prisma/         # Configuração e schemas do Prisma
└── server.ts       # Arquivo principal da aplicação
```

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rnm?schema=public"
JWT_SECRET="seu_jwt_secret"
PORT=3022
```

3. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

4. Inicie o servidor:
```bash
npm run dev
```

## Endpoints da API

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de usuário

### Lojas
- `GET /stores` - Lista todas as lojas
- `GET /stores/:id` - Obtém uma loja específica
- `GET /stores/url/:url` - Obtém uma loja pela URL
- `POST /stores` - Cria uma nova loja
- `PUT /stores/:id` - Atualiza uma loja
- `DELETE /stores/:id` - Remove uma loja

### Categorias
- `GET /stores/url/:url/categories` - Lista categorias de uma loja
- `POST /categories` - Cria uma nova categoria
- `PUT /categories/:id` - Atualiza uma categoria
- `DELETE /categories/:id` - Remove uma categoria

### Produtos
- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Obtém um produto específico
- `POST /products` - Cria um novo produto
- `PUT /products/:id` - Atualiza um produto
- `DELETE /products/:id` - Remove um produto

### Endereços
- `GET /addresses` - Lista endereços do usuário
- `POST /addresses` - Adiciona um novo endereço
- `PUT /addresses/:id` - Atualiza um endereço
- `DELETE /addresses/:id` - Remove um endereço

## Modelos de Dados

### Store
```typescript
{
  id: string
  name: string
  description: string
  email: string
  password: string
  url: string
  logo: string
  createdAt: Date
  updatedAt: Date
}
```

### Category
```typescript
{
  id: string
  name: string
  description: string
  storeId: string
  createdAt: Date
  updatedAt: Date
}
```

### Product
```typescript
{
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  storeId: string
  createdAt: Date
  updatedAt: Date
}
```

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos, inclua o token no header da requisição:

```
Authorization: Bearer <seu_token_jwt>
```

## Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:
```bash
npm run dev
```

Para construir o projeto:
```bash
npm run build
```

Para iniciar o servidor em produção:
```bash
npm start
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento
- `npm run build` - Compila o projeto
- `npm start` - Inicia o servidor em produção
- `npm run prisma:generate` - Gera os tipos do Prisma
- `npm run prisma:migrate` - Executa as migrações do banco de dados