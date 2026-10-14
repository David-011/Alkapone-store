import sql from "mssql";
import getConnection from "../conexion/connection";

const asegurar = async (pool: any) => {
  await pool.request().query("IF OBJECT_ID('Favorito','U') IS NULL CREATE TABLE Favorito (IdFavorito INT IDENTITY(1,1) PRIMARY KEY, IdCliente INT NOT NULL FOREIGN KEY REFERENCES Cliente(IdCliente), IdProducto INT NOT NULL FOREIGN KEY REFERENCES producto(idProducto), Fecha DATETIME DEFAULT GETDATE(), CONSTRAINT UQ_Favorito UNIQUE (IdCliente, IdProducto))");
};

export const ListarFavoritos = async (idCliente: number) => {
  const pool = await getConnection();
  await asegurar(pool);
  const r = await pool.request().input("c", sql.Int, idCliente).query("SELECT p.idProducto, p.nombre, p.imagen, p.precio, p.categoria FROM Favorito f JOIN producto p ON p.idProducto = f.IdProducto WHERE f.IdCliente=@c ORDER BY f.Fecha DESC");
  return r.recordset;
};

export const AgregarFavorito = async (idCliente: number, idProducto: number) => {
  const pool = await getConnection();
  await asegurar(pool);
  await pool.request().input("c", sql.Int, idCliente).input("p", sql.Int, idProducto).query("IF NOT EXISTS (SELECT 1 FROM Favorito WHERE IdCliente=@c AND IdProducto=@p) INSERT INTO Favorito (IdCliente, IdProducto) VALUES (@c, @p)");
};

export const QuitarFavorito = async (idCliente: number, idProducto: number) => {
  const pool = await getConnection();
  await asegurar(pool);
  await pool.request().input("c", sql.Int, idCliente).input("p", sql.Int, idProducto).query("DELETE FROM Favorito WHERE IdCliente=@c AND IdProducto=@p");
};
