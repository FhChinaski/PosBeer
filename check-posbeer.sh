#!/bin/bash
echo "🍺 Validando estructura y entorno de POSBeer..."
echo "───────────────────────────────────────────────"

# --- Configuración esperada ---
folders=(
  "app"
  "app/(components)"
  "components/ui"
  "components/pos"
  "lib"
)

files=(
  "app/layout.tsx"
  "app/page.tsx"
  "components/ui/button.tsx"
  "components/ui/input.tsx"
  "components/ui/toaster.tsx"
  "lib/utils.ts"
  "tailwind.config.ts"
  "package.json"
  "firebase.json"
)

missing_folders=()
missing_files=()
missing_pkgs=()

# --- Revisión de carpetas ---
echo "📂 Carpetas:"
for folder in "${folders[@]}"; do
  if [ -d "$folder" ]; then
    echo "  ✅ $folder"
  else
    echo "  ❌ $folder"
    missing_folders+=("$folder")
  fi
done

# --- Revisión de archivos ---
echo ""
echo "📄 Archivos:"
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file"
    missing_files+=("$file")
  fi
done

# --- Revisión de dependencias ---
echo ""
echo "📦 Dependencias críticas:"
dependencies=(tailwindcss sonner next-themes @radix-ui/react-slot firebase framer-motion)
for dep in "${dependencies[@]}"; do
  if npm list "$dep" &>/dev/null; then
    echo "  ✅ $dep"
  else
    echo "  ❌ $dep (no instalada)"
    missing_pkgs+=("$dep")
  fi
done

# --- Resumen final ---
echo ""
echo "───────────────────────────────────────────────"
if [ ${#missing_folders[@]} -eq 0 ] && [ ${#missing_files[@]} -eq 0 ] && [ ${#missing_pkgs[@]} -eq 0 ]; then
  echo "🎉 Todo está correcto. POSBeer listo para correr con 'npm run dev'."
else
  echo "⚠️  Se detectaron problemas:"
  [ ${#missing_folders[@]} -ne 0 ] && echo "  🗂 Faltan carpetas: ${missing_folders[*]}"
  [ ${#missing_files[@]} -ne 0 ] && echo "  📄 Faltan archivos: ${missing_files[*]}"
  [ ${#missing_pkgs[@]} -ne 0 ] && echo "  📦 Faltan dependencias: ${missing_pkgs[*]}"
  echo ""
  echo "👉 Corre 'npm install' para reparar dependencias o usa './fix-posbeer-structure.sh' para regenerar archivos."
fi

echo "───────────────────────────────────────────────"
