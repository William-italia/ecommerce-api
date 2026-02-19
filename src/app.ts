import express from 'express';
import productRoutes from './modules/products/product.routes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

//middlewares
//routes
app.use('/products', productRoutes);

export default app;
