import express from 'express';
import productRoutes from './modules/products/product.routes';

const app = express();
app.use(express.json());

//middlewares
//routes
app.use('/products', productRoutes);

export default app;
