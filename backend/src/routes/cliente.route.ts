import * as clienteController from '../controllers/cliente.controller';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    clienteController.getClientes().then(data => res.json(data)).catch(e => res.status(500).json(e));
});

router.get('/:id', async (req, res) => {
    clienteController.getClienteById(parseInt(req.params.id)).then(data => res.json(data)).catch(e => res.status(500).json(e));
});

router.get('/correo/:correo', async (req, res) => {
    clienteController.getClienteByCorreo(req.params.correo).then(data => res.json(data)).catch(e => res.status(500).json(e));
});

router.post('/', async (req, res) => {
    clienteController.createCliente(req.body).then(data => res.json(data)).catch(e => res.status(500).json(e));
});

router.put('/:id', async (req, res) => {
    clienteController.updateCliente(parseInt(req.params.id), req.body).then(data => res.json(data)).catch(e => res.status(500).json(e));
});

router.delete('/:id', async (req, res) => {
    clienteController.deleteCliente(parseInt(req.params.id)).then(data => res.json(data)).catch(e => res.status(500).json(e));
});

export default router;
