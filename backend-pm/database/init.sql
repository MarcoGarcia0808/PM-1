-- Artisan Auction PostgreSQL
-- Ejecuta este archivo con:
--   psql -U postgres -f database/init.sql
--
-- Nota: CREATE DATABASE falla si artisan_auction ya existe.
-- Si ya existe, comenta la linea CREATE DATABASE y ejecuta de nuevo desde:
--   \connect artisan_auction

CREATE DATABASE artisan_auction;

\connect artisan_auction

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(120) UNIQUE NOT NULL,
  contrasena_hash TEXT NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'comprador'
      CHECK (rol IN ('admin', 'artesano', 'comprador')),
  creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS artesanos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  especialidad VARCHAR(100) NOT NULL,
  ubicacion VARCHAR(100),
  descripcion TEXT
);

CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  artesano_id INTEGER NOT NULL
      REFERENCES artesanos(id) ON DELETE CASCADE,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT,
  precio_inicial NUMERIC(10,2) NOT NULL
      CHECK (precio_inicial >= 0),
  activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS ofertas (
  id SERIAL PRIMARY KEY,
  producto_id INTEGER NOT NULL
      REFERENCES productos(id) ON DELETE CASCADE,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  monto NUMERIC(10,2) NOT NULL CHECK (monto > 0),
  fecha TIMESTAMP DEFAULT NOW()
);

INSERT INTO artesanos
  (nombre, especialidad, ubicacion, descripcion)
SELECT
  'María Hernández',
  'Alfarería',
  'Amealco, Querétaro',
  'Muñecas Lele y barro tradicional'
WHERE NOT EXISTS (SELECT 1 FROM artesanos WHERE nombre = 'María Hernández');

INSERT INTO artesanos
  (nombre, especialidad, ubicacion, descripcion)
SELECT
  'José Ramírez',
  'Textiles',
  'Tolimán, Querétaro',
  'Rebozos y bordados otomíes'
WHERE NOT EXISTS (SELECT 1 FROM artesanos WHERE nombre = 'José Ramírez');

INSERT INTO artesanos
  (nombre, especialidad, ubicacion, descripcion)
SELECT
  'Lucía Torres',
  'Vara de sauce',
  'Tequisquiapan, Querétaro',
  'Cestería artesanal'
WHERE NOT EXISTS (SELECT 1 FROM artesanos WHERE nombre = 'Lucía Torres');

INSERT INTO productos
  (artesano_id, nombre, descripcion, precio_inicial)
SELECT
  1,
  'Muñeca Lele grande',
  'Muñeca artesanal 40 cm',
  350.00
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Muñeca Lele grande');

INSERT INTO productos
  (artesano_id, nombre, descripcion, precio_inicial)
SELECT
  2,
  'Rebozo de seda',
  'Rebozo tejido a mano',
  1200.00
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Rebozo de seda');

INSERT INTO productos
  (artesano_id, nombre, descripcion, precio_inicial)
SELECT
  3,
  'Canasta de sauce',
  'Canasta mediana tejida',
  180.00
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Canasta de sauce');

SELECT * FROM artesanos;
