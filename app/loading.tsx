"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Loading() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-all duration-700 ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-amber-100"
          : "bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 text-white"
      }`}
    >
      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10"
      >
        <Image
          src="/logo-posbeer.png"
          alt="POSBeer Logo"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />
      </motion.div>

      {/* TEXTO PRINCIPAL */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className={`text-2xl font-semibold tracking-wide mb-3 ${
          isDark ? "text-amber-400" : "text-amber-200"
        }`}
      >
        Conectando con POSBeer
      </motion.h2>

      {/* SUBTEXTO */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="opacity-80 text-base mb-6"
      >
        Preparando tus datos, usuarios y pedidos...
      </motion.p>

      {/* ANIMACIÓN DE BARRA */}
      <motion.div
        className={`w-64 h-1.5 rounded-full overflow-hidden ${
          isDark ? "bg-gray-700" : "bg-amber-800/40"
        }`}
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className={`w-1/3 h-full ${
            isDark ? "bg-amber-400" : "bg-amber-200"
          }`}
        />
      </motion.div>
    </div>
  );
}