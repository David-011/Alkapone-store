import * as clienteDao from '../dao/cliente.dao';
import { cliente } from '../models/cliente';

export const getClientes = async () => {
    return await clienteDao.Listar();
}

export const getClienteById = async (id: number) => {
    return await clienteDao.ObtenerPorId(id);
}

export const getClienteByCorreo = async (correo: string) => {
    return await clienteDao.ObtenerPorCorreo(correo);
}

export const createCliente = async (c: cliente) => {
    return await clienteDao.Crear(c);
}

export const updateCliente = async (id: number, c: cliente) => {
    return await clienteDao.Actualizar(id, c);
}

export const deleteCliente = async (id: number) => {
    return await clienteDao.Eliminar(id);
}
