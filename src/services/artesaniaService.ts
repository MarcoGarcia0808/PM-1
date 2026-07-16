import { Artesano, Producto } from '../types/index';
export {
  obtenerArtesanos,
  obtenerArtesanoPorId,
  obtenerProductos,
  obtenerProductosPorArtesano,
} from '../repositorios/ArtesanoRepositorio';

// Exportaciones de compatibilidad para HomeScreen, que aun muestra datos locales.
// Los hooks de artesanos consumen el backend real mediante las funciones async.
export const artesanos: Artesano[] = [];
export const productos: Producto[] = [];
