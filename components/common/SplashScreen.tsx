"use client";
import { motion } from "framer-motion";

export function SplashScreen({ loadingText = "Cargando POSBeer..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4"
      />
      <p className="text-lg font-semibold">{loadingText}</p>
    </div>
  );
}
