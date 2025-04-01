import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import storeRoutes from './routes/store.routes';
import addressRoutes from './routes/address.routes';
import categoryRoutes from './routes/category.route';
import productRoutes from './routes/product.routes';
import sessionRoutes from './routes/session.routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/ping', (req, res) => {
  res.send('pong');
});

app.use('/users', userRoutes);
app.use('/stores', storeRoutes);
app.use('/addresses', addressRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/auth', sessionRoutes);



app.listen(3022, () => {
  console.log('Server is running on port 3023');
});
