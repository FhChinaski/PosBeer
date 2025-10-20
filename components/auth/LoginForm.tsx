"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export function LoginForm() {
  const router = useRouter();
  const q = useSearchParams();
  const tenant = q.get("tenant") ?? "posbeer";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tryDemoByRole = async (mail:string, pass:string) => {
    const demos: Record<string,string> = {
      "admin@posbeer.com":"demo123",
      "mesero@posbeer.com":"demo123",
      "cocina@posbeer.com":"demo123"
    };
    if (demos[mail] && demos[mail]===pass) {
      return true;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Primero intentamos contra Firebase Auth real
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/dashboard?tenant=" + tenant);
        return;
      } catch (e) {
        // Si falla, probamos credenciales demo (híbrido)
        const ok = await tryDemoByRole(email, password);
        if (ok) {
          router.push("/dashboard?tenant=" + tenant);
          return;
        }
        throw e;
      }
    } catch (err:any) {
      setError("Credenciales inválidas. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{display:"grid", placeItems:"center", minHeight:"100vh"}}
    >
      <div className="card" style={{maxWidth:420, width:"100%"}}>
        <h1 style={{margin:"0 0 .5rem 0"}}>Iniciar sesión</h1>
        <p style={{margin:"0 0 1rem 0", opacity:.8}}>Ingresa a tu punto de venta</p>
        <form onSubmit={handleLogin} className="grid" style={{gap:".75rem"}}>
          <Input type="email" placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} required />
          <Input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required />
          {error && <div style={{color:"#b00020", fontSize:".9rem"}}>{error}</div>}
          <Button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
        </form>

        <div style={{marginTop:"1rem", fontSize:".9rem", opacity:.8}}>
          <div>Demo rápido:</div>
          <code>admin@posbeer.com / demo123</code><br/>
          <code>mesero@posbeer.com / demo123</code><br/>
          <code>cocina@posbeer.com / demo123</code>
        </div>
      </div>
    </motion.div>
  );
}
