# ChatUPQ

Clon funcional inspirado en WhatsApp para Programacion Movil. La app reproduce el flujo principal de mensajeria: lista de chats, contactos, conversacion, envio de mensajes, respuesta automatica y detalle del chat.

## Tecnologias

- Expo SDK 54
- React Native
- TypeScript
- React Navigation
- expo-sqlite en Expo Go
- localStorage como soporte de demostracion web

## Ejecutar

Instalar dependencias:

```powershell
npm.cmd install --cache .\.npm-cache
```

Ejecutar para Expo Go:

```powershell
npx.cmd expo start --clear
```

Ejecutar en navegador:

```powershell
npx.cmd expo start --clear --web
```

Verificar TypeScript:

```powershell
npm.cmd run typecheck
```

## Pantallas

- Chats
- Conversacion
- Contactos
- Perfil o detalle del chat
- Ajustes

## Funcionalidad central

El usuario puede abrir una conversacion, escribir un mensaje, enviarlo, verlo en pantalla y recibir una respuesta automatica. En Expo Go los mensajes se guardan en SQLite.

## Evidencia para entrega

- Capturas de las pantallas principales.
- Video corto enviando un mensaje.
- Captura del repositorio en GitHub.
- Commits descriptivos.
