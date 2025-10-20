"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";
import { PosbeerLogo } from "@/components/PosbeerLogo";

// Cargamos los gráficos sin romper SSR
const LineChart = dynamic(() => import("recharts").then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = true;
    if (!user) router.push("/login");
  }, [router]);

  const stats = [
    { title: "Ventas Hoy", value: "$8,430", color: "bg-blue-500" },
    { title: "Cervezas Vendidas", value: "237", color: "bg-sky-600" },
    { title: "Platillos Vendidos", value: "128", color: "bg-blue-700" },
    { title: "Propinas", value: "$920", color: "bg-indigo-600" },
  ];

  const data = [
    { name: "Lun", cerveza: 4000, comida: 2400 },
    { name: "Mar", cerveza: 3500, comida: 2000 },
    { name: "Mié", cerveza: 4200, comida: 2500 },
    { name: "Jue", cerveza: 4800, comida: 3000 },
    { name: "Vie", cerveza: 7500, comida: 4100 },
    { name: "Sáb", cerveza: 8200, comida: 5000 },
    { name: "Dom", cerveza: 6100, comida: 3200 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md bg-blue-50 dark:bg-slate-800">
        <div className="flex items-center gap-2">
          <PosbeerLogo textColor="#1d4ed8" />
          <span className="text-xl font-bold text-blue-900 dark:text-sky-100">POSBeer Dashboard</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-blue-800 flex items-center gap-1"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="p-2 rounded-lg border hover:bg-blue-100 dark:hover:bg-slate-700"
          >
            {document.documentElement.classList.contains("dark") ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {stats.map((s) => (
          <motion.div
            key={s.title}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`${s.color} text-white p-4 rounded-xl shadow-md`}
          >
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="text-2xl font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <section className="p-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-sky-200">
            Ventas Semanales
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cerveza" stroke="#1d4ed8" strokeWidth={3} />
              <Line type="monotone" dataKey="comida" stroke="#facc15" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}