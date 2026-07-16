// src/hooks/useArtesanos.ts
import { useCallback, useEffect, useState } from 'react';
import {
  obtenerArtesanos,
  obtenerArtesanoPorId,
  obtenerProductosPorArtesano,
} from '../repositorios/ArtesanoRepositorio';
import { Artesano, Producto } from '../types/index';

// Hook para la LISTA de artesanos
export function useArtesanos() {
  const [artesanos, setArtesanos] = useState<Artesano[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarArtesanos = useCallback(() => {
    let activo = true;
    (async () => {
      try {
        setCargando(true);
        setError(null);
        const datos = await obtenerArtesanos();
        if (activo) setArtesanos(datos);
      } catch (err) {
        if (activo) setError(err instanceof Error ? err.message : 'Error al cargar artesanos');
      } finally {
        if (activo) setCargando(false);
      }
    })();
    return () => { activo = false; };
  }, []);

  useEffect(() => cargarArtesanos(), [cargarArtesanos]);

  return { artesanos, cargando, error, recargar: cargarArtesanos };
}

// Hook para UN artesano + sus productos en subasta
export function useArtesano(id: number) {
  const [artesano, setArtesano] = useState<Artesano | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarArtesano = useCallback(() => {
    let activo = true;
    (async () => {
      try {
        setCargando(true);
        setError(null);
        const [a, p] = await Promise.all([
          obtenerArtesanoPorId(id),
          obtenerProductosPorArtesano(id),
        ]);
        if (activo) { setArtesano(a); setProductos(p); }
      } catch (err) {
        if (activo) setError(err instanceof Error ? err.message : 'Error al cargar artesano');
      } finally {
        if (activo) setCargando(false);
      }
    })();
    return () => { activo = false; };
  }, [id]);

  useEffect(() => cargarArtesano(), [cargarArtesano]);

  return { artesano, productos, cargando, error, recargar: cargarArtesano };
}
