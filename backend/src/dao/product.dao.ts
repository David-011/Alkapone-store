import getConnection from "../conexion/connection";
import { product } from "../models/product";

export const Listar = async (): Promise<product[]> => {
    const tsql = "SELECT * FROM Producto";
    const pool = await getConnection();
    const rs = await pool.query<product>(tsql);
    return rs.recordset;
}

export const Crear = async (prod: product): Promise<any> => {
    const tsql = `
      INSERT INTO Producto (nombre, descripcion, precio, stock, categoria)
      VALUES (@nombre, @descripcion, @precio, @stock, @categoria);
      SELECT SCOPE_IDENTITY() AS id;`;
    const pool = await getConnection();
    const result = await pool.request()
        .input('nombre', prod.nombre)
        .input('descripcion', prod.descripcion)
        .input('precio', prod.precio)
        .input('stock', prod.stock)
        .input('categoria', prod.categoria)
        .query(tsql);
    return result.recordset[0];
}

export const Actualizar = async (id: number, prod: product): Promise<any> => {
    const tsql = `
      UPDATE Producto
      SET nombre = @nombre,
          descripcion = @descripcion,
          precio = @precio,
          stock = @stock,
          categoria = @categoria
      WHERE idProducto = @id;`;
    const pool = await getConnection();
    const result = await pool.request()
        .input('id', id)
        .input('nombre', prod.nombre)
        .input('descripcion', prod.descripcion)
        .input('precio', prod.precio)
        .input('stock', prod.stock)
        .input('categoria', prod.categoria)
        .query(tsql);
    return result.rowsAffected;
}

export const Eliminar = async (id: number): Promise<any> => {
    const tsql = `DELETE FROM Producto WHERE idProducto = @id`;
    const pool = await getConnection();
    const result = await pool.request()
        .input('id', id)
        .query(tsql);
    return result.rowsAffected;
}
