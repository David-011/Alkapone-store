import getConnection from "../conexion/connection";
import { cliente } from "../models/cliente";

export const Listar = async () => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Cliente");
    return result.recordset;
}

export const ObtenerPorId = async (id: number) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Cliente WHERE IdCliente=@id");
    return result.recordset;
}

export const ObtenerPorCorreo = async (correo: string) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("correo", correo)
        .query("SELECT * FROM Cliente WHERE Correo=@correo");
    return result.recordset;
}

export const Crear = async (c: cliente) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("Nombre", c.Nombre)
        .input("Apellido", c.Apellido)
        .input("Correo", c.Correo)
        .input("Contrasena", c.Contrasena)
        .input("Direccion", c.Direccion)
        .input("Telefono", c.Telefono)
        .query("INSERT INTO Cliente(Nombre,Apellido,Correo,Contrasena,Direccion,Telefono) VALUES(@Nombre,@Apellido,@Correo,@Contrasena,@Direccion,@Telefono); SELECT SCOPE_IDENTITY() AS id;");
    return result.recordset;
}

export const Actualizar = async (id: number, c: cliente) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", id)
        .input("Nombre", c.Nombre)
        .input("Apellido", c.Apellido)
        .input("Correo", c.Correo)
        .input("Contrasena", c.Contrasena)
        .input("Direccion", c.Direccion)
        .input("Telefono", c.Telefono)
        .query("UPDATE Cliente SET Nombre=@Nombre,Apellido=@Apellido,Correo=@Correo,Contrasena=@Contrasena,Direccion=@Direccion,Telefono=@Telefono WHERE IdCliente=@id");
    return result.rowsAffected;
}

export const Eliminar = async (id: number) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", id)
        .query("DELETE FROM Cliente WHERE IdCliente=@id");
    return result.rowsAffected;
}
