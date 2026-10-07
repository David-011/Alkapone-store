import { config } from "mssql";

export const sqlConfig: config = {
  user: 'sa',
  password: 'Alkapone2026!',
  database: 'PPI',
  server: 'localhost',
  options: {
    trustServerCertificate: true,
    encrypt: true
  }
};
