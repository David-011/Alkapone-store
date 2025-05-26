const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/productos', productRoutes); // ruta base

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
