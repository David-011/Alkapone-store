import express from 'express';
import cors from 'cors';
import productRouter from './routes/product.route';
import clienteRouter from './routes/cliente.route';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(cors({
    origin: '*',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

app.use('/api/product', productRouter);
app.use('/api/cliente', clienteRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Alkapone Store escuchando en el puerto ${PORT}`);
});
