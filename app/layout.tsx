import "./globals.css";
import { PosbeerLogo } from "@/components/ui/PosbeerLogo";

export const metadata = {
  title: "POSBeer",
  description: "Punto de venta para cervecerías artesanales y gastronomía",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-800">
        <header className="flex items-center justify-between px-6 py-4 border-b border-blue-200">
          <PosbeerLogo textColor="#1D4ED8" />
          <p className="font-semibold text-blue-700">🍺 POSBeer System</p>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
