$baseUrl = "http://localhost:3000"

Write-Host "1. Health check" -ForegroundColor Cyan
Invoke-RestMethod "$baseUrl/health" | ConvertTo-Json -Depth 5

Write-Host "`n2. Artesanos" -ForegroundColor Cyan
Invoke-RestMethod "$baseUrl/artesanos" | ConvertTo-Json -Depth 5

Write-Host "`n3. Registro de Ana" -ForegroundColor Cyan
$ana = @{
  nombre = "Ana"
  correo = "ana@upq.mx"
  contrasena = "123456"
  rol = "artesano"
} | ConvertTo-Json

try {
  Invoke-RestMethod "$baseUrl/auth/registro" -Method Post -ContentType "application/json" -Body $ana | ConvertTo-Json -Depth 5
} catch {
  $statusCode = [int]$_.Exception.Response.StatusCode
  if ($statusCode -eq 409) {
    Write-Host "Ana ya estaba registrada. Continuando con login." -ForegroundColor Yellow
  } else {
    throw
  }
}

Write-Host "`n4. Login exitoso" -ForegroundColor Cyan
$credenciales = @{
  correo = "ana@upq.mx"
  contrasena = "123456"
} | ConvertTo-Json

$respuesta = Invoke-RestMethod "$baseUrl/auth/login" -Method Post -ContentType "application/json" -Body $credenciales
$respuesta | ConvertTo-Json -Depth 5

Write-Host "`n5. Token JWT" -ForegroundColor Cyan
$token = $respuesta.token
$token

Write-Host "`n6. Productos sin token: debe responder 401" -ForegroundColor Cyan
try {
  Invoke-RestMethod "$baseUrl/productos"
} catch {
  $statusCode = [int]$_.Exception.Response.StatusCode
  Write-Host "Codigo HTTP: $statusCode"
  $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
  $reader.ReadToEnd()
}

Write-Host "`n7. Productos con token: debe responder 200" -ForegroundColor Cyan
Invoke-RestMethod "$baseUrl/productos" -Headers @{ Authorization = "Bearer $token" } | ConvertTo-Json -Depth 5
