import express from 'express';
import * as pedidoDao from '../dao/pedido.dao';
const router = express.Router();

router.post('/', (req, res) => {
  const b = req.body;
  if (!b || !b.IdCliente || !Array.isArray(b.items) || b.items.length === 0) {
    res.status(400).json({ error: 'Datos del pedido incompletos' });
    return;
  }
  pedidoDao.CrearPedido(b).then(data => res.json(data)).catch(e => res.status(500).json({ error: String(e.message || e) }));
});

router.get('/cliente/:id', (req, res) => {
  pedidoDao.PedidosPorCliente(parseInt(req.params.id)).then(data => res.json(data)).catch(e => res.status(500).json({ error: String(e.message || e) }));
});

export default router;
