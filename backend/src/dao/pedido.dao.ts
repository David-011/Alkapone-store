import sql from "mssql";
import getConnection from "../conexion/connection";

export const CrearPedido = async (p: any) => {
  const pool = await getConnection();
  await pool.request().query("IF OBJECT_ID('DetallePedido','U') IS NULL CREATE TABLE DetallePedido (IdDetalle INT IDENTITY(1,1) PRIMARY KEY, IdPedido INT FOREIGN KEY REFERENCES Pedido(IdPedido), IdProducto INT, Nombre VARCHAR(100), Cantidad INT, PrecioUnitario DECIMAL(10,2))");
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    const r = await new sql.Request(tx)
      .input("IdCliente", sql.Int, p.IdCliente)
      .input("Total", sql.Decimal(10, 2), p.Total)
      .query("INSERT INTO Pedido (IdCliente, EstadoPedido, Total) OUTPUT INSERTED.IdPedido VALUES (@IdCliente, 'Confirmado', @Total)");
    const idPedido = r.recordset[0].IdPedido;
    for (const it of p.items) {
      await new sql.Request(tx)
        .input("IdPedido", sql.Int, idPedido)
        .input("IdProducto", sql.Int, it.idProducto)
        .input("Nombre", sql.VarChar(100), it.nombre)
        .input("Cantidad", sql.Int, it.cantidad)
        .input("Precio", sql.Decimal(10, 2), it.precio)
        .query("INSERT INTO DetallePedido (IdPedido, IdProducto, Nombre, Cantidad, PrecioUnitario) VALUES (@IdPedido, @IdProducto, @Nombre, @Cantidad, @Precio); UPDATE producto SET stock = CASE WHEN stock >= @Cantidad THEN stock - @Cantidad ELSE 0 END WHERE idProducto = @IdProducto");
    }
    await new sql.Request(tx)
      .input("IdPedido", sql.Int, idPedido)
      .input("Metodo", sql.VarChar(50), p.MetodoPago)
      .input("Monto", sql.Decimal(10, 2), p.Total)
      .query("INSERT INTO Pago (IdPedido, MetodoPago, MontoPago) VALUES (@IdPedido, @Metodo, @Monto)");
    await tx.commit();
    return { idPedido };
  } catch (e) {
    await tx.rollback();
    throw e;
  }
};

export const PedidosPorCliente = async (id: number) => {
  const pool = await getConnection();
  await pool.request().query("IF OBJECT_ID('DetallePedido','U') IS NULL CREATE TABLE DetallePedido (IdDetalle INT IDENTITY(1,1) PRIMARY KEY, IdPedido INT FOREIGN KEY REFERENCES Pedido(IdPedido), IdProducto INT, Nombre VARCHAR(100), Cantidad INT, PrecioUnitario DECIMAL(10,2))");
  const p = await pool.request().input("id", id).query("SELECT p.IdPedido, p.FechaPedido, p.EstadoPedido, p.Total, pg.MetodoPago FROM Pedido p LEFT JOIN Pago pg ON pg.IdPedido = p.IdPedido WHERE p.IdCliente=@id ORDER BY p.FechaPedido DESC");
  const d = await pool.request().input("id", id).query("SELECT d.IdPedido, d.IdProducto, d.Nombre, d.Cantidad, d.PrecioUnitario, pr.imagen FROM DetallePedido d LEFT JOIN producto pr ON pr.idProducto = d.IdProducto WHERE d.IdPedido IN (SELECT IdPedido FROM Pedido WHERE IdCliente=@id)");
  return p.recordset.map((x: any) => ({ ...x, items: d.recordset.filter((i: any) => i.IdPedido === x.IdPedido) }));
};
