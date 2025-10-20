"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => { router.replace("/login"); }, [router]);
  return <div className="container"><p>Redirigiendo al Login…</p></div>;
}
