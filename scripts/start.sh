#!/bin/bash
# Levanta Alkapone Store completo (base de datos + backend + frontend)
cd "$(dirname "$0")/.." || exit 1
ROOT=$(pwd)
PASS='Alkapone2026!'
SQLCMD="docker exec -i sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $PASS -C"

echo "[1/4] SQL Server..."
if docker ps -a --format '{{.Names}}' | grep -qx sqlserver; then
  docker start sqlserver > /dev/null
else
  docker run -e ACCEPT_EULA=Y -e "MSSQL_SA_PASSWORD=$PASS" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest > /dev/null
fi
until $SQLCMD -Q "SELECT 1" > /dev/null 2>&1; do sleep 3; done

echo "[2/4] Base de datos..."
HAY=$($SQLCMD -h -1 -W -Q "SET NOCOUNT ON; SELECT COUNT(*) FROM sys.databases WHERE name='PPI'" | tr -d '[:space:]')
if [ "$HAY" = "0" ]; then
  $SQLCMD -Q "CREATE DATABASE PPI" > /dev/null
  $SQLCMD -i /dev/stdin < "$ROOT/backend/db/init.sql" > /dev/null
  echo "      PPI creada con datos de prueba"
else
  echo "      PPI ya existe"
fi

echo "[3/4] Dependencias..."
[ -d node_modules ] || npm install
[ -d backend/node_modules ] || (cd backend && npm install)

echo "[4/4] Backend y frontend..."
mkdir -p .logs
printf "export const environment = {\n    production: false,\n    urlApiBase: '/api/'\n};\n" > src/environments/environment.development.ts
if ! curl -s -o /dev/null http://localhost:3000/api/product; then
  (cd backend && nohup npm start > "$ROOT/.logs/backend.log" 2>&1 &)
fi
if ! curl -s -o /dev/null http://localhost:4200; then
  nohup npx ng serve --host 0.0.0.0 --proxy-config proxy.conf.json > "$ROOT/.logs/frontend.log" 2>&1 &
fi
echo "Esperando que arranquen..."
for i in $(seq 1 60); do
  B=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/product)
  F=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4200)
  [ "$B" = "200" ] && [ "$F" = "200" ] && break
  sleep 3
done
echo "Backend: $B | Frontend: $F"
echo "Listo. Abre el puerto 4200 en la pestana Puertos."
