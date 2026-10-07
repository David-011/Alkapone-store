import * as productDao from '../dao/product.dao';
import { product } from '../models/product';

export const getProduct = async (): Promise<product[]> => {
    try {
        return await productDao.Listar();
    } catch (error) {
        throw error;
    }
}

export const createProduct = async (prod: product): Promise<any> => {
    try {
        return await productDao.Crear(prod);
    } catch (error) {
        throw error;
    }
}

export const updateProduct = async (id: number, prod: product): Promise<any> => {
    try {
        return await productDao.Actualizar(id, prod);
    } catch (error) {
        throw error;
    }
}

export const deleteProduct = async (id: number): Promise<any> => {
    try {
        return await productDao.Eliminar(id);
    } catch (error) {
        throw error;
    }
}
