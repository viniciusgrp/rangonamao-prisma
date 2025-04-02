import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';

// Import routes
import storeRoutes from './routes/store.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import ingredientRoutes from './routes/ingredient.routes';
import sessionRoutes from './routes/session.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/stores', storeRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/auth', sessionRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3022;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 