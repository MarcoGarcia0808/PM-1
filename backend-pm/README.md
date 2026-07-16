# Backend Artisan Auction

Backend para la practica de repaso con Node.js, Express, PostgreSQL y JWT.

## 1. Instalar dependencias

```powershell
cd "C:\Users\marco\OneDrive\Documentos\9no parcial\programación móvil\PM\backend-pm"
npm install
```

## 2. Crear la base de datos y tablas

Primero verifica que PostgreSQL este iniciado y que tengas la contraseña del usuario `postgres`.

```powershell
psql -U postgres -f database/init.sql
```

El script crea la base `artisan_auction`, se conecta a ella, crea tablas y carga datos semilla. Si la base ya existe, `CREATE DATABASE artisan_auction;` fallara; en ese caso comenta esa linea en `database/init.sql` y ejecuta de nuevo.

## 3. Configurar variables de entorno

```powershell
Copy-Item .env.example .env
```

Abre `backend-pm/.env` y coloca tu contraseña real de PostgreSQL en:

```env
DB_PASSWORD=COLOCA_AQUI_TU_CONTRASENA_POSTGRES
```

## 4. Iniciar el backend

```powershell
npm start
```

El servidor escucha en `0.0.0.0:3000` para aceptar conexiones desde un telefono en la misma red Wi-Fi.

## 5. Ejecutar pruebas PowerShell

En otra terminal:

```powershell
cd "C:\Users\marco\OneDrive\Documentos\9no parcial\programación móvil\PM\backend-pm"
.\PRUEBAS_POWERSHELL.ps1
```

La salida muestra `/health`, `/artesanos`, registro, login, token, `/productos` sin token con `401` y `/productos` con token.

## 6. Obtener la IPv4 para Expo Go

```powershell
ipconfig
```

Busca la IPv4 del adaptador Wi-Fi, por ejemplo `192.168.1.50`.

## 7. Modificar URL del repositorio movil

En `src/services/artesaniaService.ts`, reemplaza:

```ts
const URL_BASE = 'http://TU_IP_WIFI:3000';
```

por tu IPv4:

```ts
const URL_BASE = 'http://192.168.1.50:3000';
```

## 8. Abrir puerto 3000 en Windows

Ejecuta PowerShell como administrador:

```powershell
New-NetFirewallRule `
  -DisplayName "API Artisan Auction" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 3000 `
  -Action Allow
```

## 9. Probar desde el telefono

Con el backend iniciado, abre en el navegador del telefono:

```text
http://TU_IP_WIFI:3000/health
```

Debe aparecer `bd: conectada`.

## 10. Arrancar Expo

Desde la raiz del proyecto:

```powershell
cd "C:\Users\marco\OneDrive\Documentos\9no parcial\programación móvil\PM"
npm start
```

Escanea el QR con Expo Go y abre la pestana de artesanos.

## 11. Commit

Revisa los cambios y ejecuta:

```bash
git add backend-pm/
git commit -m "feat: backend Express + PostgreSQL con JWT (practica de repaso)"
```

No ejecutes `git push` hasta revisar el commit.
