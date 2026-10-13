import express from 'express';
import * as pqrsDao from '../dao/pqrs.dao';
const router = express.Router();

router.post('/', (req, res) => {
  const b = req.body;
  if (!b || !b.Tipo || !b.Descripcion || String(b.Descripcion).trim().length < 10) {
    res.status(400).json({ error: 'Tipo y descripcion (minimo 10 caracteres) son obligatorios' });
    return;
  }
  pqrsDao.CrearPQRS(b).then(data => res.json(data)).catch(e => res.status(500).json({ error: String(e.message || e) }));
});

export default router;
