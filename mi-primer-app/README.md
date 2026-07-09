# Navegacion anidada en Expo

Proyecto Expo + React Native + TypeScript con Bottom Tabs y un Stack anidado para el flujo lista -> detalle de productos.

## Ejecutar

```bash
npm install
npx expo start
```

## Navegacion anidada

La app usa Expo Router como entrada principal (`expo-router/entry`). Expo Router crea el `NavigationContainer`, por eso no se agrego otro contenedor manual.

Dentro de las pestañas se agrego una nueva tab llamada `Productos`. Esa tab renderiza `ProductosStack`, creado con `@react-navigation/native-stack`, y permite navegar de `ProductosLista` a `ProductoDetalle` pasando el parametro tipado `id`.

```text
App
└── NavigationContainer
    └── BottomTabs
        ├── Home
        ├── Explore
        └── Productos
            └── ProductosStack
                ├── ProductosLista
                └── ProductoDetalle
```

## Reflexion

Se reviso que el proyecto ya usaba React Navigation 7 con:

- `@react-navigation/native` 7.x
- `@react-navigation/bottom-tabs` 7.x

Faltaba un paquete de Stack instalado directamente, asi que se uso:

- `@react-navigation/native-stack` 7.x

La compatibilidad se aseguro instalando con `npx expo install @react-navigation/native-stack`, respetando la misma version mayor de React Navigation que ya tenia el proyecto. Tambien se mantuvo un solo `NavigationContainer`, el que administra Expo Router.
