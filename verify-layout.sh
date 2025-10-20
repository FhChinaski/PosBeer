#!/bin/bash
echo "🔍 POSBeer QA + AutoFix"
echo "───────────────────────────────────────────────"

# Colores para mejor legibilidad
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

# 1️⃣ Buscar imports de componentes rotos
echo "📦 Escaneando imports sospechosos..."
grep -R "import .* '@/components" app 2>/dev/null | while read -r line; do
  file=$(echo "$line" | cut -d: -f1)
  path=$(echo "$line" | sed -E 's/.from "([^"]+)"./\1/')
  resolved_path=$(echo "$path" | sed 's#@/#./#')
  resolved_path_tsx="${resolved_path}.tsx"

  if [ ! -f "$resolved_path_tsx" ] && [ ! -f "${resolved_path}.js" ]; then
    echo -e "  ${RED}❌ ERROR:${NC} Import roto en ${file} → ${path}"
  else
    echo -e "  ${GREEN}✅ OK:${NC} ${file} importa ${path}"
  fi
done

echo "───────────────────────────────────────────────"

# 2️⃣ Revisar archivos críticos
echo "📄 Revisando archivos base..."
declare -a files=(
  "app/layout.tsx"
  "app/page.tsx"
  "components/ui/toaster.tsx"
  "components/ui/button.tsx"
  "components/ui/input.tsx"
  "lib/utils.ts"
  "app/globals.css"
)
for f in "${files[@]}"; do
  if [ -f "$f" ]; then
    echo -e "  ${GREEN}✅${NC} $f presente"
  else
    echo -e "  ${RED}❌${NC} Falta $f — creando..."
    mkdir -p "$(dirname "$f")"
    touch "$f"
    echo "// [AutoFix] Placeholder creado por verify-layout.sh" > "$f"
  fi
done

echo "───────────────────────────────────────────────"

# 3️⃣ Autocorrección de Toaster → AppToaster
echo "🧠 Corrigiendo imports de Toaster..."
if grep -q "import { Toaster } from \"@/components/ui/toaster\"" app/layout.tsx 2>/dev/null; then
  sed -i.bak 's/import { Toaster } from "@\/components\/ui\/toaster"/import { AppToaster } from "@\/components\/ui\/toaster"/g' app/layout.tsx
  sed -i.bak 's/<Toaster \/>/<AppToaster \/>/g' app/layout.tsx
  echo -e "  ${YELLOW}⚙️  AutoFix:${NC} Import y componente Toaster reemplazados por AppToaster"
else
  echo -e "  ${GREEN}✅${NC} Import de Toaster ya es correcto"
fi

echo "───────────────────────────────────────────────"

# 4️⃣ Validar dependencias críticas
echo "📦 Validando dependencias..."
declare -a pkgs=("sonner" "next-themes" "firebase" "tailwindcss" "clsx" "tailwind-merge" "framer-motion")

for pkg in "${pkgs[@]}"; do
  if npm list "$pkg" >/dev/null 2>&1; then
    echo -e "  ${GREEN}✅${NC} $pkg instalado"
  else
    echo -e "  ${YELLOW}⚠️${NC} Falta dependencia: $pkg — instalando..."
    npm install "$pkg" --save >/dev/null 2>&1
  fi
done

echo "───────────────────────────────────────────────"

# 5️⃣ Verificar rutas duplicadas en Next.js (pages duplicadas)
echo "🗂 Revisando rutas duplicadas..."
dupes=$(find app -type f -name "page.*" | wc -l)
if [ "$dupes" -gt 1 ]; then
  echo -e "  ${YELLOW}⚠️  Hay múltiples archivos page.* en 'app/'. Esto puede causar conflicto de rutas.${NC}"
  find app -type f -name "page.*"
else
  echo -e "  ${GREEN}✅${NC} Estructura de rutas limpia."
fi

echo "───────────────────────────────────────────────"

# 6️⃣ Limpieza
echo "🧹 Limpiando caché y backups..."
rm -rf .next
rm -f app/layout.tsx.bak
echo "───────────────────────────────────────────────"
echo -e "✅ ${GREEN}Verificación + AutoFix completada.${NC}"
echo "👉 Ahora ejecuta: npm run dev"
