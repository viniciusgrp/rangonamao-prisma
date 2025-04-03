import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';

import storeRoutes from './routes/store.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import ingredientRoutes from './routes/ingredient.routes';
import sessionRoutes from './routes/session.routes';
import userRoutes from './routes/user.routes';
import addressRoutes from './routes/address.routes';
import orderRoutes from './routes/order.routes';
import productIngredientRoutes from './routes/product-ingredient.routes';
import storeAuthRoutes from './routes/store-auth.routes';

import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(cors());
app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/stores', storeRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/auth', sessionRoutes);
app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/orders', orderRoutes);
app.use('/product-ingredients', productIngredientRoutes);
app.use('/store-auth', storeAuthRoutes);

app.use(errorHandler as ErrorRequestHandler);

const PORT = process.env.PORT || 3022;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
