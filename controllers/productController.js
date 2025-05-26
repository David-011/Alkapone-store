
const { sql, config } = require("../db");

exports.getAllProducts = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM Productos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getProductById = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input("IdProducto", sql.Int, req.params.id)
      .query("SELECT * FROM Productos WHERE IdProducto = @IdProducto");
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createProduct = async (req, res) => {
  const { Nombre, Descripcion, Precio, Stock, Categoria } = req.body;
  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("Descripcion", sql.VarChar, Descripcion)
      .input("Precio", sql.Decimal(10, 2), Precio)
      .input("Stock", sql.Int, Stock)
      .input("Categoria", sql.VarChar, Categoria)
      .query(`
        INSERT INTO Productos (Nombre, Descripcion, Precio, Stock, Categoria)
        VALUES (@Nombre, @Descripcion, @Precio, @Stock, @Categoria)
      `);
    res.status(201).send("Producto creado");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  const { Nombre, Descripcion, Precio, Stock, Categoria } = req.body;
  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input("IdProducto", sql.Int, req.params.id)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Descripcion", sql.VarChar, Descripcion)
      .input("Precio", sql.Decimal(10, 2), Precio)
      .input("Stock", sql.Int, Stock)
      .input("Categoria", sql.VarChar, Categoria)
      .query(`
        UPDATE Productos
        SET Nombre = @Nombre,
            Descripcion = @Descripcion,
            Precio = @Precio,
            Stock = @Stock,
            Categoria = @Categoria
        WHERE IdProducto = @IdProducto
      `);
    res.send("Producto actualizado");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input("IdProducto", sql.Int, req.params.id)
      .query("DELETE FROM Productos WHERE IdProducto = @IdProducto");
    res.send("Producto eliminado");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
