"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Sun, Moon } from "lucide-react";
import { PosbeerLogo } from "@/components/PosbeerLogo";

export default function DashboardPage() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detectar si el tema actual es oscuro
    if (typeof document !== "undefined") {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.classList.toggle("dark");
      setIsDark(html.classList.contains("dark"));
    }
  };

  const stats = [
    { title: "Ventas Hoy", value: "$8,430", color: "bg-blue-500" },
    { title: "Cervezas Vendidas", value: "237", color: "bg-blue-600" },
    { title: "Ticket Promedio", value: "$178", color: "bg-blue-700" },
    { title: "Propinas", value: "$920", color: "bg-blue-800" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center p-6 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <LogOut className="w-5 h-5" /> Cerrar sesión
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-blue-400" />
          )}
        </button>
      </header>

      {/* LOGO CENTRAL */}
      <div className="flex flex-col items-center justify-center py-10 select-none">
        <PosbeerLogo textColor={isDark ? "#93c5fd" : "#1d4ed8"} />
      </div>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-8">
        {stats.map((s) => (
          <motion.div
            key={s.title}
            className={${s.color} p-6 text-white rounded-xl shadow-md}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="text-2xl font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* SECCIÓN RESUMEN */}
      <section className="bg-white dark:bg-gray-800 p-6 mx-6 rounded-xl shadow-md transition">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
          Resumen Semanal
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          📊 Próximamente: gráficas de ventas, propinas y comida en tiempo real.
        </p>
      </section>
    </div>
  );
}
