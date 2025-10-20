#!/bin/bash
echo "🧹 Limpiando compilación y conflictos de POSBeer..."
echo "───────────────────────────────────────────────"

# 1️⃣ Eliminar duplicados problemáticos de rutas
echo "🗑️ Eliminando páginas duplicadas..."
rm -f app/page.js 2>/dev/null
rm -f app/\(components\)/page.tsx 2>/dev/null

# 2️⃣ Borrar cachés y archivos temporales
echo "🧽 Limpiando carpetas .next, node_modules/.cache, y logs..."
rm -rf .next node_modules/.cache .turbo >/dev/null 2>&1

# 3️⃣ Comprobación de dependencias
echo "📦 Verificando dependencias críticas..."
pnpm install || npm install

# 4️⃣ Reiniciar Next.js limpio
echo "🚀 Reiniciando servidor de desarrollo..."
npm run dev &

echo "───────────────────────────────────────────────"
echo "✅ Limpieza completa. POSBeer debería abrir en http://localhost:3000"
echo "───────────────────────────────────────────────"
