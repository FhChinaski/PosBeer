"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow-md flex justify-between">
      <h1 className="font-bold text-xl">🍺 POSBeer</h1>
      <div className="flex gap-6">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/inventario" className="hover:underline">Inventario</Link>
        <Link href="/ventas" className="hover:underline">Ventas</Link>
        <Link href="/configuracion" className="hover:underline">Configuración</Link>
      </div>
    </nav>
  );
}
