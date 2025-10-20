"use client";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";

export default function SafeNavbar() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setEmail(u?.email ?? null));
    return () => unsub();
  }, []);

  const logout = async () => {
    try { await signOut(auth); } catch {}
    router.push("/login");
  };

  return (
    <header className="app container">
      <div className="brand">POSBeer <span className="badge">Dashboard</span></div>
      <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
        {email && <span style={{fontSize:".9rem", opacity:.8}}>{email}</span>}
        <button className="btn" onClick={logout}>Salir</button>
      </div>
    </header>
  );
}
