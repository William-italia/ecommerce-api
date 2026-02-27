import express from 'express';
import productRoutes from './modules/products/product.routes';
import cartRoutes from './modules/carts/cart.routes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

//middlewares
//routes
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);

export default app;
