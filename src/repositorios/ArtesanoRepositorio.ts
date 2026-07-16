import { getJson } from '../api/artisanApi';
import { Artesano, Producto } from '../types/index';

export async function obtenerArtesanos(): Promise<Artesano[]> {
  return getJson<Artesano[]>('/artesanos');
}

export async function obtenerArtesanoPorId(id: number): Promise<Artesano | null> {
  try {
    return await getJson<Artesano>(`/artesanos/${id}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Error HTTP 404')) {
      return null;
    }

    throw error;
  }
}

export async function obtenerProductos(): Promise<Producto[]> {
  return [];
}

export async function obtenerProductosPorArtesano(artesanoId: number): Promise<Producto[]> {
  return [];
}
