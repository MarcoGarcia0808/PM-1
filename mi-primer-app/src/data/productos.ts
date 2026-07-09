import type { Producto } from '@/src/types/producto';

export const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Mochila urbana',
    descripcion: 'Mochila resistente con compartimento para laptop y bolsillo frontal.',
    precio: 649,
  },
  {
    id: 2,
    nombre: 'Termo acero',
    descripcion: 'Termo de acero inoxidable de 750 ml para bebidas frias o calientes.',
    precio: 299,
  },
  {
    id: 3,
    nombre: 'Libreta premium',
    descripcion: 'Libreta de pasta dura con hojas punteadas para apuntes y bocetos.',
    precio: 179,
  },
  {
    id: 4,
    nombre: 'Audifonos bluetooth',
    descripcion: 'Audifonos inalambricos con estuche de carga y microfono integrado.',
    precio: 899,
  },
];
