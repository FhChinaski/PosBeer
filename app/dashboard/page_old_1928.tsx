"use client";
import SafeNavbar from "../../components/common/SafeNavbar";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, getDocs, Timestamp, query, orderBy, limit } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Sale = { total:number; categoria:"cerveza"|"comida"; propina?:number; createdAt?: any };
type Card = { title:string; value:string };

export default function DashboardPage(){
  const router = useRouter();
  const q = useSearchParams();
  const tenant = q.get("tenant") ?? "posbeer";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{
      if(!u){ router.replace("/login?tenant="+tenant); }
    });
    return ()=>unsub();
  },[router, tenant]);

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true);
      setError(null);
      try{
        const ref = collection(db, "ventas");
        const snap = await getDocs(query(ref, orderBy("createdAt","desc"), limit(200)));
        const arr: Sale[] = snap.docs.map(d=>{
          const data:any = d.data();
          return {
            total: Number(data.total ?? 0),
            categoria: (data.categoria ?? "cerveza"),
            propina: Number(data.propina ?? 0),
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined
          };
        });
        if(arr.length === 0){
          setSales([
            { total: 8430, categoria:"cerveza", propina: 600 },
            { total: 3120, categoria:"comida",  propina: 120 },
            { total: 9250, categoria:"cerveza", propina: 800 },
            { total: 2100, categoria:"comida",  propina: 90  },
          ]);
        }else{
          setSales(arr);
        }
      }catch(e:any){
        console.error(e);
        setError("No se pudieron cargar ventas. Mostrando demo.");
        setSales([
          { total: 8430, categoria:"cerveza", propina: 600 },
          { total: 3120, categoria:"comida",  propina: 120 },
          { total: 9250, categoria:"cerveza", propina: 800 },
          { total: 2100, categoria:"comida",  propina: 90  },
        ]);
      }finally{
        setLoading(false);
      }
    };
    load();
  },[]);

  const totals = useMemo(()=>{
    const beer = sales.filter(s=>s.categoria==="cerveza").reduce((a,b)=>a+(b.total||0),0);
    const food = sales.filter(s=>s.categoria==="comida").reduce((a,b)=>a+(b.total||0),0);
    const tips = sales.reduce((a,b)=>a+(b.propina||0),0);
    const tickets = sales.length || 1;
    const avg = (beer+food)/tickets;
    const cards:Card[] = [
      { title:"Ventas Cerveza", value: `$${beer.toLocaleString()}` },
      { title:"Ventas Comida",  value: `$${food.toLocaleString()}` },
      { title:"Ticket Promedio", value: `$${avg.toFixed(0)}` },
      { title:"Propinas", value: `$${tips.toLocaleString()}` },
    ];
    const chartData = [
      { name:"Cerveza", total: beer },
      { name:"Comida",  total: food },
      { name:"Propinas", total: tips },
    ];
    return { cards, chartData };
  },[sales]);

  return (
    <div>
      <SafeNavbar/>
      <main className="container">
        <h1 style={{marginTop:"0"}}>Resumen de Ventas</h1>
        {loading && <div className="card">Cargando datos…</div>}
        {error && <div className="card" style={{borderColor:"#ffd1d1", background:"#fff4f4"}}>{error}</div>}
        {!loading && (
          <>
            <section className="grid" style={{gridTemplateColumns:"repeat(4,minmax(0,1fr))"}}>
              {totals.cards.map(c=>(
                <div key={c.title} className="card">
                  <div style={{opacity:.65, fontSize:".9rem"}}>{c.title}</div>
                  <div style={{fontSize:"1.6rem", fontWeight:800}}>{c.value}</div>
                </div>
              ))}
            </section>

            <section className="card" style={{marginTop:"1rem"}}>
              <h2 style={{marginTop:0}}>Ventas por categoría</h2>
              <div style={{width:"100%", height:320}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={totals.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
