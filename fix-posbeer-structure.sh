#!/bin/bash
echo "🍺 POSBeer Quick Fix & QA Validator"
echo "───────────────────────────────────────────────"

# ======== FUNCIONES ========
check_folder() {
  if [ -d "$1" ]; then
    echo "  ✅ Carpeta: $1"
  else
    echo "  ❌ Falta carpeta: $1"
    mkdir -p "$1"
    echo "    ➕ Creada carpeta: $1"
  fi
}

check_file() {
  if [ -f "$1" ]; then
    echo "  ✅ Archivo: $1"
  else
    echo "  ❌ Falta archivo: $1"
    create_missing_file "$1"
  fi
}

create_missing_file() {
  case "$1" in
    app/globals.css)
      cat <<'CSS' > "$1"
@tailwind base;
@tailwind components;
@tailwind utilities;
body {
  font-family: 'Inter', sans-serif;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
CSS
      ;;
    lib/utils.ts)
      cat <<'TS' > "$1"
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
TS
      ;;
    components/ui/button.tsx)
      cat <<'TSX' > "$1"
import * as React from "react";
import { cn } from "@/lib/utils";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}
export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 ring-offset-2 disabled:opacity-50";
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6 text-lg",
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
TSX
      ;;
    components/ui/input.tsx)
      cat <<'TSX' > "$1"
import * as React from "react";
import { cn } from "@/lib/utils";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";
export { Input };
TSX
      ;;
    components/ui/toaster.tsx)
      cat <<'TSX' > "$1"
"use client";
import { Toaster } from "sonner";
export function AppToaster() {
  return <Toaster position="top-right" expand={true} richColors />;
}
TSX
      ;;
    *)
      echo "⚠️ No hay plantilla definida para $1, creado archivo vacío."
      touch "$1"
      ;;
  esac
}

# ======== VALIDACIÓN DE ESTRUCTURA ========
echo "📂 Validando estructura de carpetas..."
check_folder app
check_folder app/components
check_folder components/ui
check_folder components/pos
check_folder lib

echo "───────────────────────────────────────────────"
echo "📄 Verificando archivos base..."
check_file app/globals.css
check_file lib/utils.ts
check_file components/ui/button.tsx
check_file components/ui/input.tsx
check_file components/ui/toaster.tsx
check_file tailwind.config.ts
check_file firebase.json
check_file package.json

echo "───────────────────────────────────────────────"
echo "📦 Verificando dependencias críticas..."
declare -a packages=("tailwindcss" "sonner" "next-themes" "@radix-ui/react-slot" "firebase" "framer-motion" "clsx" "tailwind-merge")

for pkg in "${packages[@]}"; do
  if npm list "$pkg" >/dev/null 2>&1; then
    echo "  ✅ $pkg instalado"
  else
    echo "  ⚠️ $pkg faltante — instalando..."
    npm install "$pkg" --save >/dev/null 2>&1
  fi
done

# ======== LIMPIEZA ========
echo "───────────────────────────────────────────────"
echo "🧹 Limpiando caché de Next.js..."
rm -rf .next

echo "───────────────────────────────────────────────"
echo "✅ Revisión completa — entorno reparado y limpio."
echo "👉 Ejecuta ahora: npm run dev"
echo "───────────────────────────────────────────────"
