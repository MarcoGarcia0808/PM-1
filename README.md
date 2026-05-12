# 📱 Programación Móvil — Mayo–Agosto 2026

**Universidad Politécnica de Querétaro (UPQ)**
Ingeniería en Sistemas Computacionales · 9.° Cuatrimestre

---

## Descripción

Repositorio oficial de la asignatura **Programación Móvil**. Aquí encontrarás el material de clase, ejemplos de código, prácticas y avances del proyecto integrador.

**Competencia principal:** Desarrollar aplicaciones innovadoras empleando técnicas y recursos de programación móvil para provisión de soluciones y servicios tecnológicos.

**Framework de referencia:** React Native con Expo

---

## Estructura del repositorio

```
PM/
├── Unidad-I/                          # Introducción al cómputo móvil (Semanas 1–5)
│   ├── Clase-01-Diseño-Movil/
│   ├── Clase-02-Entorno-ReactNative/
│   ├── Clase-03-Tipos-Datos-Expresiones/
│   ├── Clase-04-Estructura-Proyectos/
│   └── Parcial-1/
│
├── Unidad-II/                         # Diseño de aplicaciones móviles (Semanas 6–10)
│   ├── Clase-06-Interfaz-Usuario/
│   ├── Clase-07-Navegacion/
│   ├── Clase-08-Servicios-API/
│   ├── Clase-09-Notificaciones/
│   └── Parcial-2/
│
├── Unidad-III/                        # Empleo de sensores (Semanas 11–14)
│   ├── Clase-11-Sensores/
│   ├── Clase-12-Camara-Ubicacion/
│   ├── Clase-13-Topicos-Selectos/
│   └── Parcial-3/
│
├── Proyecto-Integrador/
│   ├── docs/                          # Análisis, diseño, diagramas UML
│   └── app/                           # Código fuente del proyecto
│
└── README.md
```

---

## Contenido por unidad

### Unidad I — Introducción al cómputo móvil

| Semana | Tema |
|--------|------|
| 1 | Paradigmas de diseño móvil (esqueumorfismo, flat, material) · UX/UI |
| 2 | Entorno de desarrollo: Node.js, VS Code, Expo Go · Primer proyecto |
| 3 | Tipos de datos, expresiones, JSX y componentes básicos |
| 4 | Estructura de proyectos móviles, navegación con Expo Router |
| 5 | **Evaluación Parcial 1** |

### Unidad II — Diseño de aplicaciones móviles

| Semana | Tema |
|--------|------|
| 6 | Interfaz de usuario: StyleSheet, Flexbox, componentes de UI |
| 7 | Navegación avanzada: Stack, Tabs, Drawer |
| 8 | Consumo de APIs y servicios REST |
| 9 | Notificaciones push y locales |
| 10 | **Evaluación Parcial 2** |

### Unidad III — Empleo de sensores en dispositivos móviles

| Semana | Tema |
|--------|------|
| 11 | Gestión de sensores: acelerómetro, giroscopio |
| 12 | Cámara, geolocalización y mapas |
| 13 | Tópicos selectos de programación móvil |
| 14 | **Evaluación Parcial 3** |

---

## Evidencias de aprendizaje

- Documento de análisis y diseño con diagramas UML
- Prácticas por unidad evaluadas por rúbrica
- Mapas conceptuales por parcial
- Exámenes parciales y final
- Proyecto integrador

---

## Requisitos del entorno de desarrollo

| Herramienta | Versión mínima | Enlace |
|-------------|----------------|--------|
| Node.js | LTS (v20+) | [nodejs.org](https://nodejs.org) |
| npm | 10+ (incluido con Node) | — |
| Visual Studio Code | Última estable | [code.visualstudio.com](https://code.visualstudio.com) |
| Expo Go (móvil) | Última en tienda | App Store / Play Store |
| Git | 2.40+ | [git-scm.com](https://git-scm.com) |

---

## Paso 1 — Instalar Node.js

Node.js es el motor que ejecuta JavaScript fuera del navegador. React Native y Expo dependen de él.

**Windows y macOS:**

1. Ve a [https://nodejs.org](https://nodejs.org).
2. Descarga la versión **LTS** (la que dice "Recommended for most users").
3. Ejecuta el instalador con las opciones por defecto.
4. **En Windows:** asegúrate de marcar la casilla *"Add to PATH"*.

**Linux (Ubuntu/Debian):**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verificar la instalación:**

```bash
node --version
npm --version
```

Ambos deben devolver un número de versión (ej: `v20.x.x` y `10.x.x`).

> ⚠️ Si la terminal no reconoce `node`, cierra y vuelve a abrirla. Si persiste, verifica que Node esté en las variables de entorno (PATH).

---

## Paso 2 — Instalar Git

**Windows:**

1. Descarga desde [https://git-scm.com](https://git-scm.com).
2. En la instalación, selecciona VS Code como editor por defecto. Las demás opciones déjalas por defecto.

**macOS:**

```bash
xcode-select --install
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get install git
```

**Configurar tu identidad (usa tus datos de GitHub):**

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

---

## Paso 3 — Instalar Visual Studio Code

1. Descarga de [https://code.visualstudio.com](https://code.visualstudio.com).
2. Instálalo con opciones por defecto.
3. **En Windows:** marca *"Add to PATH"* y *"Add 'Open with Code' to context menu"*.

**Extensiones recomendadas** (instalar desde `Ctrl + Shift + X`):

| Extensión | Para qué sirve |
|-----------|----------------|
| ES7+ React/Redux/React-Native Snippets | Atajos de código (`rnf` + Tab → componente completo) |
| Prettier - Code Formatter | Formateo automático al guardar |
| Error Lens | Errores visibles en la línea de código |
| React Native Tools | Depuración y autocompletado |
| GitLens | Historial de Git en el editor |
| Material Icon Theme | Íconos por tipo de archivo |

**Configurar Prettier como formateador por defecto:**

1. `Ctrl + ,` → buscar `Default Formatter` → seleccionar **Prettier**.
2. Buscar `Format On Save` → activar ✅.

---

## Paso 4 — Instalar Expo Go en tu teléfono

- **Android:** Busca *"Expo Go"* en Play Store.
- **iOS:** Busca *"Expo Go"* en App Store.

> **Requisito:** Tu teléfono y tu computadora deben estar en la **misma red Wi-Fi**.

---

## Paso 5 — Clonar el repositorio del curso

```bash
git clone https://github.com/BOWadapter/PM.git
cd PM
```

---

## Paso 6 — Crear tu primer proyecto con React Native

Copia y pega estos comandos en orden:

```bash
# 1. Verificar que Node está instalado
node --version
npm --version

# 2. Crear el proyecto
npx create-expo-app@latest mi-primer-app

# 3. Entrar a la carpeta del proyecto
cd mi-primer-app

# 4. Iniciar el servidor de desarrollo
npx expo start
```

| Comando | Qué hace |
|---------|----------|
| `node --version` / `npm --version` | Confirma que Node y npm están instalados |
| `npx create-expo-app@latest mi-primer-app` | Descarga la plantilla de Expo y crea el proyecto |
| `cd mi-primer-app` | Entra a la carpeta del proyecto |
| `npx expo start` | Inicia el servidor y genera un código QR |

### Conectar tu teléfono

Al ejecutar `npx expo start` verás un **código QR** en la terminal:

1. **Android:** Abre Expo Go → escanea el QR.
2. **iOS:** Abre la app de Cámara → apunta al QR → se abre Expo Go.

### Si el QR no conecta — Modo Tunnel

Común en redes universitarias o corporativas:

```bash
# Detén el servidor con Ctrl + C y reinicia así:
npx expo start --tunnel
```

Si pide instalar `@expo/ngrok`, escribe `y` y presiona Enter.

### Verificar Hot Reload

1. Abre el proyecto en VS Code:
```bash
code .
```
2. Abre `app/(tabs)/index.tsx`.
3. Cambia el texto **"Welcome!"** por **"¡Hola Programación Móvil!"**.
4. Guarda (`Ctrl + S`) y observa tu teléfono — el cambio aparece automáticamente.

> ✅ Si ves el texto actualizado, tu entorno está listo.

---

## Paso 7 (Opcional) — Configurar un emulador

**Emulador Android (cualquier SO):**

1. Descarga [Android Studio](https://developer.android.com/studio).
2. Incluye **Android SDK** y **Android Virtual Device (AVD)**.
3. Android Studio → *More Actions* → *Virtual Device Manager* → crear dispositivo (Pixel 7, API 34).
4. Con `npx expo start` corriendo, presiona `a` en la terminal.

**Simulador iOS (solo macOS):**

1. Instala **Xcode** desde la App Store.
2. Ábrelo una vez para aceptar la licencia.
3. Con `npx expo start` corriendo, presiona `i` en la terminal.

---

## Estructura del proyecto generado

```
mi-primer-app/
├── app/                    ← Pantallas (rutas automáticas con Expo Router)
│   ├── (tabs)/             ← Layout con pestañas
│   │   ├── index.tsx       ← Pantalla principal (Home)
│   │   ├── explore.tsx     ← Segunda pestaña
│   │   └── _layout.tsx     ← Configuración del Tab Navigator
│   ├── _layout.tsx         ← Layout raíz de navegación
│   └── +not-found.tsx      ← Pantalla 404
├── assets/                 ← Imágenes, fuentes, recursos estáticos
├── components/             ← Componentes reutilizables
├── constants/              ← Valores constantes (colores, config)
├── hooks/                  ← Custom hooks
├── app.json                ← Configuración de la app (nombre, ícono, splash)
├── package.json            ← Dependencias y scripts
└── tsconfig.json           ← Configuración de TypeScript
```

---

## Comandos frecuentes

| Comando | Qué hace |
|---------|----------|
| `npx expo start` | Inicia el servidor de desarrollo |
| `npx expo start --tunnel` | Inicia en modo tunnel (redes restrictivas) |
| `npx expo start --clear` | Inicia limpiando la caché |
| `npx expo install [paquete]` | Instala paquete compatible con tu versión de Expo |
| `npm install [paquete]` | Instala un paquete de npm |
| `r` (en terminal de Expo) | Recarga la app |
| `m` (en terminal de Expo) | Abre el menú de desarrollo |

---

## Checklist de verificación

Antes de la siguiente clase, verifica que puedes marcar todos estos puntos:

- [ ] Node.js instalado → `node --version` funciona
- [ ] npm instalado → `npm --version` funciona
- [ ] Git instalado y configurado → repositorio clonado
- [ ] VS Code instalado con extensiones recomendadas
- [ ] Expo Go instalado en tu teléfono
- [ ] Proyecto creado con `npx create-expo-app@latest`
- [ ] App corriendo en tu teléfono con `npx expo start`
- [ ] Hot Reload funcionando (cambias texto → se actualiza en el teléfono)

---

## Solución de problemas comunes

**"npx no se reconoce como comando"**
→ Node no está en el PATH. Reinstala Node.js y marca "Add to PATH".

**El código QR no conecta con mi teléfono**
→ Verifica misma red Wi-Fi. Desactiva VPN. Prueba `npx expo start --tunnel`.

**La app se queda en "Downloading JavaScript bundle"**
→ Ejecuta `npx expo start --clear`. Verifica que el firewall no bloquee el puerto 8081.

**Error: "Unable to resolve module"**
→ Ejecuta:
```bash
npm install
npx expo start --clear
```

**La app no muestra mis cambios**
→ Verifica que guardaste (`Ctrl + S`). Presiona `r` en la terminal. Si persiste, reinicia el servidor con `Ctrl + C` y `npx expo start`.

---

## Recursos y documentación

- [React Native — Documentación oficial](https://reactnative.dev/docs/getting-started)
- [Expo — Documentación oficial](https://docs.expo.dev)
- [DevDocs — React Native](https://devdocs.io/react_native/)
- [Material Design 3](https://m3.material.io)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)

---

## Licencia

Material académico de uso exclusivo para la asignatura Programación Móvil — UPQ, Mayo–Agosto 2026.
