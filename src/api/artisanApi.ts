// Sustituye esta IP por la IPv4 de tu PC si cambia la red Wi-Fi.
export const URL_BASE = 'http://10.16.73.179:3000';

export async function getJson<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${URL_BASE}${ruta}`);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status} al consultar ${ruta}`);
  }

  return respuesta.json();
}
