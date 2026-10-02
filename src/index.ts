import express from 'express';
import cors from 'cors';
import productRouter from './routes/product.route';
import clienteRouter from './routes/cliente.route';
import empleadoRouter from './routes/empleado.route';
import carritoRouter from './routes/carrito.route';
import detalleCarritoRouter from './routes/detalleCarrito.route';
import pedidoRouter from './routes/pedido.route';
import pagoRouter from './routes/pago.route';
import pqrsRouter from './routes/pqrs.route';
import chatbotRouter from './routes/chatbot.route';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', productRouter);
app.use('/api/cliente', clienteRouter);
app.use('/api/empleado', empleadoRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/detalle-carrito', detalleCarritoRouter);
app.use('/api/pedido', pedidoRouter);
app.use('/api/pago', pagoRouter);
app.use('/api/pqrs', pqrsRouter);
app.use('/api/chatbot', chatbotRouter);

app.listen(PORT, () => {
    console.log(`Servidor Alkapone Store escuchando en el puerto ${PORT}`);
});
