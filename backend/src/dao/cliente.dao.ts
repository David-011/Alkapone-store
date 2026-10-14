import sql from "mssql";
import bcrypt from "bcryptjs";
import getConnection from "../conexion/connection";
import { cliente } from "../models/cliente";

const limpiar = (rows: any[]) => rows.map(({ Contrasena, ...r }: any) => r);

export const ListarClientes = async () => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Cliente");
    return limpiar(result.recordset);
}

export const ObtenerPorId = async (id: number) => {
    const pool = await getConnection();
    const result = await pool.request().input("id", id).query("SELECT * FROM Cliente WHERE IdCliente=@id");
    return limpiar(result.recordset);
}

export const ObtenerPorCorreo = async (correo: string) => {
    const pool = await getConnection();
    const result = await pool.request().input("correo", correo).query("SELECT * FROM Cliente WHERE Correo=@correo");
    return limpiar(result.recordset);
}

export const CrearCliente = async (c: cliente) => {
    const pool = await getConnection();
    const h = await bcrypt.hash(String(c.Contrasena || ""), 10);
    const result = await pool.request()
        .input("Nombre", c.Nombre)
        .input("Apellido", c.Apellido)
        .input("Correo", c.Correo)
        .input("Contrasena", sql.VarChar(100), h)
        .input("Direccion", c.Direccion)
        .input("Telefono", c.Telefono)
        .query("INSERT INTO Cliente (Nombre,Apellido,Correo,Contrasena,Direccion,Telefono) VALUES (@Nombre,@Apellido,@Correo,@Contrasena,@Direccion,@Telefono); SELECT SCOPE_IDENTITY() as id;");
    return result.recordset;
}

export const ActualizarCliente = async (id: number, c: cliente) => {
    const pool = await getConnection();
    const h = c.Contrasena ? await bcrypt.hash(String(c.Contrasena), 10) : null;
    const result = await pool.request()
        .input("id", id)
        .input("Nombre", c.Nombre)
        .input("Apellido", c.Apellido)
        .input("Correo", c.Correo)
        .input("Contrasena", sql.VarChar(100), h)
        .input("Direccion", c.Direccion)
        .input("Telefono", c.Telefono)
        .query("UPDATE Cliente SET Nombre=@Nombre,Apellido=@Apellido,Correo=@Correo,Contrasena=COALESCE(@Contrasena,Contrasena),Direccion=@Direccion,Telefono=@Telefono WHERE IdCliente=@id");
    return result.rowsAffected;
}

export const EliminarCliente = async (id: number) => {
    const pool = await getConnection();
    const result = await pool.request().input("id", id).query("DELETE FROM Cliente WHERE IdCliente=@id");
    return result.rowsAffected;
}

export const Listar = ListarClientes;
export const Crear = CrearCliente;
export const Actualizar = ActualizarCliente;
export const Eliminar = EliminarCliente;
