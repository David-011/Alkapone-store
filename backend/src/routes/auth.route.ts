import express from 'express';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import getConnection from '../conexion/connection';
const router = express.Router();

const pick = (b: any, k: string) => (b ? (b[k] ?? b[k.charAt(0).toLowerCase() + k.slice(1)]) : undefined);

router.post('/login', async (req, res) => {
  try {
    const correo = String(pick(req.body, 'Correo') || '').trim();
    const clave = String(pick(req.body, 'Contrasena') || '');
    if (!correo || !clave) { res.status(400).json({ error: 'Faltan datos' }); return; }
    const pool = await getConnection();
    const r = await pool.request().input('c', sql.VarChar(100), correo).query('SELECT * FROM Cliente WHERE Correo=@c');
    const u = r.recordset[0];
    let ok = false;
    if (u) {
      const guardada = String(u.Contrasena || '');
      if (guardada.startsWith('$2')) {
        ok = await bcrypt.compare(clave, guardada);
      } else if (guardada === clave) {
        ok = true;
        const h = await bcrypt.hash(clave, 10);
        await pool.request().input('h', sql.VarChar(100), h).input('id', sql.Int, u.IdCliente).query('UPDATE Cliente SET Contrasena=@h WHERE IdCliente=@id');
      }
    }
    if (!ok) { res.status(401).json({ error: 'Correo o contrasena incorrectos' }); return; }
    delete u.Contrasena;
    res.json(u);
  } catch (e: any) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

router.post('/register', async (req, res) => {
  try {
    const b = req.body || {};
    const nombre = pick(b, 'Nombre');
    const apellido = pick(b, 'Apellido');
    const correo = String(pick(b, 'Correo') || '').trim();
    const clave = String(pick(b, 'Contrasena') || '');
    if (!nombre || !apellido || !correo || !clave) { res.status(400).json({ error: 'Completa los campos obligatorios' }); return; }
    if (clave.length < 6) { res.status(400).json({ error: 'La contrasena debe tener minimo 6 caracteres' }); return; }
    const pool = await getConnection();
    const ya = await pool.request().input('c', sql.VarChar(100), correo).query('SELECT IdCliente FROM Cliente WHERE Correo=@c');
    if (ya.recordset.length > 0) { res.status(409).json({ error: 'Ese correo ya esta registrado' }); return; }
    const h = await bcrypt.hash(clave, 10);
    const r = await pool.request()
      .input('n', sql.VarChar(100), nombre)
      .input('a', sql.VarChar(100), apellido)
      .input('c', sql.VarChar(100), correo)
      .input('h', sql.VarChar(100), h)
      .input('d', sql.VarChar(200), pick(b, 'Direccion') || '')
      .input('t', sql.VarChar(20), pick(b, 'Telefono') || '')
      .query('INSERT INTO Cliente (Nombre,Apellido,Correo,Contrasena,Direccion,Telefono) OUTPUT INSERTED.IdCliente VALUES (@n,@a,@c,@h,@d,@t)');
    res.json({ idCliente: r.recordset[0].IdCliente });
  } catch (e: any) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

export default router;
