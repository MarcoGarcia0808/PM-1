export function formatChatTime(value: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  return date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function nowIso() {
  return new Date().toISOString();
}
