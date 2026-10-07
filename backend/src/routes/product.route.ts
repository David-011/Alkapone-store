import * as productController from '../controllers/product.controller';
import express from 'express';

const router = express.Router();

router.get('/', (_, rs) => {
    productController.getProduct()
        .then(obj => rs.json(obj))
        .catch(e => rs.status(500).json(e));
});

router.post('/', (req, rs) => {
    productController.createProduct(req.body)
        .then(result => rs.status(201).json(result))
        .catch(e => rs.status(500).json(e));
});

router.put('/:id', (req, rs) => {
    const id = Number(req.params.id);
    productController.updateProduct(id, req.body)
        .then(result => rs.json(result))
        .catch(e => rs.status(500).json(e));
});

router.delete('/:id', (req, rs) => {
    const id = Number(req.params.id);
    productController.deleteProduct(id)
        .then(result => rs.json(result))
        .catch(e => rs.status(500).json(e));
});

export default router;
