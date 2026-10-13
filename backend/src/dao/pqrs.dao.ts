import sql from "mssql";
import getConnection from "../conexion/connection";

export const CrearPQRS = async (b: any) => {
  const pool = await getConnection();
  const r = await pool.request()
    .input("IdCliente", sql.Int, b.IdCliente || null)
    .input("Tipo", sql.VarChar(50), b.Tipo)
    .input("Descripcion", sql.VarChar(sql.MAX), b.Descripcion)
    .query("INSERT INTO PQRS (IdCliente, Tipo, Descripcion, Estado) OUTPUT INSERTED.IdPQRS VALUES (@IdCliente, @Tipo, @Descripcion, 'Recibido')");
  return { idPQRS: r.recordset[0].IdPQRS };
};
