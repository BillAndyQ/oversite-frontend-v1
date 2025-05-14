"use client"
import AppNavbar from "@/app/user/admin/ordenes-trabajo/equipos/AppNavbar";
import { OrdenTrabajoEquipo } from "@/app/schemas/admin/ordenesTrabajo/ordenTrabEquipo";
import TablaDinamic from "@/app/components/TableDinamic";
import { Button } from "@/components/ui/button";
import { ChevronDown, DownloadIcon, Search, SlidersHorizontal, UploadIcon } from "lucide-react";
import React, { useState} from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import TableOrdenes from "@/app/components/TableOrdenes";

// Solo de prueba el Navbar

export default function Page() {
  const algunosDatosDeOrdenes : any = [
    {
      nOrdenTrabajo: "OT-001",
      nOrdenServicio: "OS-001",
      ruc: "12345678901",
      empresa: "Empresa 1",
      empresa_matriz: "Matriz 1",
      f_servicio: new Date("2023-01-01"),
      certificadora: "Certificadora 1",
      tipo_unidad: ["Unidad 1", "Unidad 2"],
      placa: "ABC-123",
      f_factura: new Date("2023-01-02"),
      n_factura: "F001",
      area: "Área 1",
      monto_sin_igv: 1000,
      monto_con_igv: 1180,
      igv: 180,
      detraccion: 0,
      verif_pago_detraccion: true,
      verif_factura: true,
      verif_pago: true,
      dolares: 0
    },
    {
      nOrdenTrabajo: "OT-002",
      nOrdenServicio: "OS-002",
      ruc: "12345678902",
      empresa: "Empresa 2",
      empresa_matriz: "Matriz 2",
      f_servicio: new Date("2023-02-01"),
      certificadora: "Certificadora 2",
      tipo_unidad: ["Unidad 3"],
      placa: "DEF-456",
      f_factura: new Date("2023-02-02"),
      n_factura: "F002",
      area: "Área 2",
      monto_sin_igv: 2000,
      monto_con_igv: 2360,
      igv: 360,
      detraccion: 0,
      verif_pago_detraccion: true,
      verif_factura: true,
      verif_pago: true,
      dolares: 0
    }

  ]

  const [selectColumnsContabilidad, setSelectColumnsContabilidad] = useState(false);

  function handleSelectColumnsContabilidad() {
    setSelectColumnsContabilidad(!selectColumnsContabilidad);
  }

  const [columnas, setColumnas] = useState<
  { id: string; nombre: string; visible: boolean }[]
  >(
    Object.keys(OrdenTrabajoEquipo.shape).map((key) => ({
      id: key,
      nombre:
        OrdenTrabajoEquipo.shape[key as keyof typeof OrdenTrabajoEquipo.shape]
          ?.description || key,
      visible: true,
    }))
  );

  // Manejar la visibilidad de una columna
  const handleVisibilidadColumna = (id: string) => {
    setColumnas((prev) =>
      prev.map((columna) =>
        columna.id === id ? { ...columna, visible: !columna.visible } : columna
      )
    );
  };

  return (
    <div className="">
      <AppNavbar/>
      
    </div>
  );
}