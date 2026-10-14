import express from 'express';
import * as dao from '../dao/favorito.dao';
const router = express.Router();
const fallo = (res: any, e: any) => res.status(500).json({ error: String(e.message || e) });

router.get('/:idCliente', (req, res) => {
  dao.ListarFavoritos(parseInt(req.params.idCliente)).then(d => res.json(d)).catch(e => fallo(res, e));
});

router.post('/', (req, res) => {
  const b = req.body || {};
  if (!b.IdCliente || !b.IdProducto) { res.status(400).json({ error: 'Faltan datos' }); return; }
  dao.AgregarFavorito(Number(b.IdCliente), Number(b.IdProducto)).then(() => res.json({ ok: true })).catch(e => fallo(res, e));
});

router.delete('/:idCliente/:idProducto', (req, res) => {
  dao.QuitarFavorito(parseInt(req.params.idCliente), parseInt(req.params.idProducto)).then(() => res.json({ ok: true })).catch(e => fallo(res, e));
});

export default router;
