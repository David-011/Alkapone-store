# ALKAPONE STORE

Tienda de ropa online (streetwear) desarrollada para la asignatura **Despliegue del Sistema**.

## Funcionalidades
- Catalogo por categorias (Ropa, Gorras, Accesorios) y buscador
- Registro e inicio de sesion de clientes, pagina Mi Cuenta
- Carrito de compras y checkout
- Pedidos y pagos guardados en SQL Server (con descuento de stock)
- Favoritos y formulario PQRS guardado en la base de datos

## Arquitectura
- Frontend: Angular 17 (TypeScript, CSS), puerto 4200
- Backend: Node.js 20 + Express 4 + TypeScript, API REST, puerto 3000
- Base de datos: SQL Server 2022 en Docker (base PPI)
- Entorno: GitHub Codespaces con Dev Container, que levanta todo solo

## Como ejecutarlo
Abrir un Codespace del repositorio y esperar 3 a 4 minutos. El script scripts/start.sh levanta SQL Server, crea la base de datos desde backend/db/init.sql, e inicia backend y frontend.
Si algo no arranca, ejecutar en la terminal: bash scripts/start.sh

Usuario de prueba: david@alkapone.com / 123456

## Estructura
- src/ : frontend Angular (vistas, servicios, template)
- backend/src/ : API (routes, dao, models)
- backend/db/init.sql : tablas y datos de prueba
- scripts/start.sh : arranque automatico
- .devcontainer/ : configuracion del Codespace

## Pendiente para produccion
- Cifrar contrasenas (hoy se guardan en texto plano)
- Mover credenciales a variables de entorno y restringir CORS
- Integrar una pasarela de pagos real (hoy el pago se registra sin cobro)
- Imagenes alojadas en el proyecto en lugar de enlaces externos
