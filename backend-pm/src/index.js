require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');
const rutasAuth = require('./rutas/auth');
const rutasArtesanos = require('./rutas/artesanos');
const rutasProductos = require('./rutas/productos');

const variablesRequeridas = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
const variablesFaltantes = variablesRequeridas.filter((variable) => !process.env[variable]);

if (variablesFaltantes.length > 0) {
  console.error(`Faltan variables de entorno: ${variablesFaltantes.join(', ')}`);
  process.exit(1);
}

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');
    return res.json({
      estado: 'ok',
      bd: 'conectada',
      hora: resultado.rows[0].now,
    });
  } catch (error) {
    console.error('Health check sin conexión a PostgreSQL:', error.message);
    return res.status(500).json({
      estado: 'error',
      bd: 'sin conexión',
    });
  }
});

app.use('/auth', rutasAuth);
app.use('/artesanos', rutasArtesanos);
app.use('/productos', rutasProductos);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Artisan Auction escuchando en http://0.0.0.0:${PORT}`);
});
