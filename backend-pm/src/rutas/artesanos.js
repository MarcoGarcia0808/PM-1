const express = require('express');
const pool = require('../db');

const router = express.Router();

function normalizarArtesano(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    especialidad: row.especialidad,
    ubicacion: row.ubicacion,
    descripcion: row.descripcion,
    imagen: `https://picsum.photos/seed/artesano-${row.id}/200`,
  };
}

router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT id, nombre, especialidad, ubicacion, descripcion FROM artesanos ORDER BY nombre'
    );
    return res.json(resultado.rows.map(normalizarArtesano));
  } catch (error) {
    console.error('Error al consultar artesanos:', error.message);
    return res.status(500).json({ error: 'Error de base de datos' });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID no válido' });
  }

  try {
    const resultado = await pool.query(
      'SELECT id, nombre, especialidad, ubicacion, descripcion FROM artesanos WHERE id = $1',
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Artesano no encontrado' });
    }

    return res.json(normalizarArtesano(resultado.rows[0]));
  } catch (error) {
    console.error('Error al consultar artesano:', error.message);
    return res.status(500).json({ error: 'Error de base de datos' });
  }
});

module.exports = router;
