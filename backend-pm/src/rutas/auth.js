const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();
const rolesPermitidos = ['admin', 'artesano', 'comprador'];

router.post('/registro', async (req, res) => {
  const { nombre, correo, contrasena, rol = 'comprador' } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: 'Nombre, correo y contraseña son obligatorios' });
  }

  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ error: 'Rol no válido' });
  }

  const correoNormalizado = String(correo).trim().toLowerCase();

  try {
    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const resultado = await pool.query(
      `INSERT INTO usuarios (nombre, correo, contrasena_hash, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, correo, rol, creado_en`,
      [nombre, correoNormalizado, contrasenaHash, rol]
    );

    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    console.error('Error al registrar usuario:', error.message);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  const correoNormalizado = String(correo).trim().toLowerCase();

  try {
    const resultado = await pool.query(
      'SELECT id, nombre, correo, contrasena_hash, rol FROM usuarios WHERE correo = $1',
      [correoNormalizado]
    );
    const usuario = resultado.rows[0];

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena_hash);

    if (!contrasenaValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
