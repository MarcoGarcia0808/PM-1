# Reporte de proyecto: ChatUPQ

## App elegida

ChatUPQ, clon funcional inspirado en WhatsApp para la materia de Programacion Movil.

## Descripcion general

ChatUPQ es una aplicacion movil de mensajeria construida con React Native, Expo SDK 54 y TypeScript. La interfaz usa una identidad visual verde, lista de conversaciones, burbujas de mensajes, contactos y una pantalla de detalle del chat. No utiliza logotipos oficiales ni recursos con copyright.

## Funcionalidades implementadas

- Lista de chats con nombre, ultimo mensaje, hora y contador de no leidos.
- Busqueda de chats por nombre o ultimo mensaje.
- Pantalla de conversacion con mensajes enviados y recibidos.
- Envio de mensajes con persistencia local.
- Respuesta automatica simple: "Mensaje recibido".
- Pantalla de contactos para crear o abrir conversaciones.
- Pantalla de perfil/detalle con telefono, estado y opciones visuales.
- Limpieza del historial del chat con confirmacion.
- Pantalla de ajustes con opciones visuales.
- Fallback web con localStorage para poder mostrar la app en navegador cuando Expo Go no conecta.

## Tecnologias usadas

- Expo SDK 54.
- React Native.
- TypeScript.
- React Navigation: Native Stack y Bottom Tabs.
- expo-sqlite para persistencia local en dispositivo movil.
- localStorage como soporte de demostracion web.
- Hooks de React: useState, useEffect, useCallback, useMemo y useFocusEffect.
- StyleSheet para estilos.

## Diagrama de navegacion

```text
App.tsx
|-- NavigationContainer
    |-- RootStack
        |-- MainTabs
        |   |-- ChatsScreen
        |   |-- ContactsScreen
        |   |-- SettingsScreen
        |-- ChatRoomScreen
        |-- ProfileScreen
```

## Persistencia con SQLite

La app crea una base de datos local llamada `chatupq.db` en Expo Go. Al iniciar, se ejecuta la configuracion de tablas y se insertan datos semilla si la tabla de contactos esta vacia.

Tablas principales:

- `contacts`: guarda contactos simulados con nombre, telefono y estado.
- `chats`: guarda conversaciones, ultimo mensaje, fecha del ultimo mensaje y no leidos.
- `messages`: guarda los mensajes de cada conversacion, texto, remitente y fecha.

Cuando el usuario envia un mensaje, se inserta un registro en `messages` y se actualiza `chats.lastMessage`. La respuesta automatica tambien se guarda. Si la app se cierra y se abre de nuevo en Expo Go, la informacion permanece guardada en el dispositivo.

En web se usa `localStorage` solamente como modo de demostracion en computadora, porque SQLite nativo esta pensado para Expo Go o emulador.

## Espacios para capturas de pantalla

### Lista de chats

Agregar captura aqui.

### Conversacion

Agregar captura aqui.

### Contactos

Agregar captura aqui.

### Perfil del chat

Agregar captura aqui.

### Ajustes

Agregar captura aqui.

## Evidencia sugerida para GitHub y Expo Go

- Captura del proyecto ejecutandose en Expo Go o evidencia de intento de conexion si la red lo bloquea.
- Captura del proyecto funcionando en navegador con `npx.cmd expo start --clear --web`.
- Captura de la lista de chats.
- Captura de envio de mensaje.
- Captura del historial despues de cerrar y abrir de nuevo.
- Captura del repositorio en GitHub con estructura `src/`.
- Commits descriptivos por funcionalidad.
