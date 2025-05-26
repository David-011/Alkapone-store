
const sql = require("mssql");

const config = {
  user: 'tu_usuario',
  password: 'tu_contraseña',
  server: 'localhost',
  database: 'TuBaseDeDatos',
  options: {
    trustServerCertificate: true,
  }
};

module.exports = { sql, config };
 
