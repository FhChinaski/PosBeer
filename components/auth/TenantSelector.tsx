"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TenantSelectorProps {
  onSelectTenant: (tenantId: string) => void;
}

export function TenantSelector({ onSelectTenant }: TenantSelectorProps) {
  const [tenant, setTenant] = useState("");

  const tenants = [
    { id: "alquimia", name: "Alquimia Taproom" },
    { id: "demo", name: "POSBeer Demo" },
  ];

  return (
    <div className="flex flex-col items-center mb-4">
      <select
        value={tenant}
        onChange={(e) => setTenant(e.target.value)}
        className="border rounded p-2 mb-2 text-sm w-56"
      >
        <option value="">Selecciona tu negocio</option>
        {tenants.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <Button
        disabled={!tenant}
        onClick={() => onSelectTenant(tenant)}
        className="w-56"
      >
        Continuar
      </Button>
    </div>
  );
}
