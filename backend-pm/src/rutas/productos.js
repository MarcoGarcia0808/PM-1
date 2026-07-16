const express = require('express');
const pool = require('../db');
const autenticarJWT = require('../middleware/auth');

const router = express.Router();

router.use(autenticarJWT);

router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT p.*, a.nombre AS artesano
      FROM productos p
      JOIN artesanos a ON a.id = p.artesano_id
      WHERE p.activo = TRUE
      ORDER BY p.id
    `);

    return res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar productos:', error.message);
    return res.status(500).json({ error: 'Error de base de datos' });
  }
});

router.post('/', async (req, res) => {
  if (!['admin', 'artesano'].includes(req.usuario.rol)) {
    return res.status(403).json({ error: 'Rol sin permisos para publicar' });
  }

  const { artesano_id, nombre, descripcion, precio_inicial } = req.body;
  const artesanoId = Number(artesano_id);
  const precioInicial = Number(precio_inicial);

  if (!Number.isInteger(artesanoId) || artesanoId <= 0 || !nombre || !Number.isFinite(precioInicial) || precioInicial < 0) {
    return res.status(400).json({ error: 'Campos obligatorios inválidos' });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO productos (artesano_id, nombre, descripcion, precio_inicial)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [artesanoId, nombre, descripcion || null, precioInicial]
    );

    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    if (error.code === '23503') {
      return res.status(400).json({ error: 'El artesano indicado no existe' });
    }

    console.error('Error al crear producto:', error.message);
    return res.status(500).json({ error: 'Error al crear producto' });
  }
});

router.post('/:id/ofertas', async (req, res) => {
  const productoId = Number(req.params.id);
  const monto = Number(req.body.monto);

  if (!Number.isInteger(productoId) || productoId <= 0) {
    return res.status(400).json({ error: 'ID no válido' });
  }

  if (!Number.isFinite(monto) || monto <= 0) {
    return res.status(400).json({ error: 'Monto no válido' });
  }

  try {
    const producto = await pool.query(
      'SELECT id, activo FROM productos WHERE id = $1',
      [productoId]
    );

    if (producto.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (!producto.rows[0].activo) {
      return res.status(400).json({ error: 'Producto no activo' });
    }

    const resultado = await pool.query(
      `INSERT INTO ofertas (producto_id, usuario_id, monto)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [productoId, req.usuario.id, monto]
    );

    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al registrar oferta:', error.message);
    return res.status(500).json({ error: 'Error al registrar oferta' });
  }
});

module.exports = router;
