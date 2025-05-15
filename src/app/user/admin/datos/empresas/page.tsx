"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Building2, Search } from "lucide-react";
import Image from "next/image";
import SearchInput from "@/app/components/busqueda";

interface Empresa {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
  ubicacion: string;
}

type DataType = {
  All: Empresa[];
  Empresas: Empresa[];
  Socios: Empresa[];
};

const data: DataType = {
  All: [
    {
      id: 1,
      nombre: "Tech Solutions",
      descripcion: "Soluciones tecnológicas para empresas",
      foto: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      ubicacion: "Lima, Perú",
    },
    {
      id: 2,
      nombre: "Green Energy",
      descripcion: "Energía renovable para un futuro sostenible",
      foto: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      ubicacion: "Bogotá, Colombia",
    },
    {
      id: 3,
      nombre: "HealthCare Plus",
      descripcion: "Servicios médicos y de salud avanzada",
      foto: "https://images.unsplash.com/photo-1581091870624-0f7c445bf98f",
      ubicacion: "Ciudad de México, México",
    },
  ],
  Empresas: [
    {
      id: 1,
      nombre: "Tech Solutions",
      descripcion: "Soluciones tecnológicas para empresas",
      foto: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      ubicacion: "Lima, Perú",
    }
  ],
  Socios: [
    {
      id: 2,
      nombre: "Green Energy",
      descripcion: "Energía renovable para un futuro sostenible",
      foto: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      ubicacion: "Bogotá, Colombia",
    },
    {
      id: 3,
      nombre: "HealthCare Plus",
      descripcion: "Servicios médicos y de salud avanzada",
      foto: "https://images.unsplash.com/photo-1581091870624-0f7c445bf98f",
      ubicacion: "Ciudad de México, México",
    }
  ]
};


export default function ListaDeEmpresas() {
  const [filtro, setFiltro] = useState("");
  const [activeTab, setActiveTab] = useState<keyof DataType>("All");

  const handleTabChange = (value: string) => {
    setActiveTab(value as keyof DataType);
  };

  const empresasFiltradas = data[activeTab].filter((empresa: Empresa) =>
    empresa.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <SearchInput filtro={filtro} setFiltro={setFiltro} />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-5 w-full">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Empresas">Empresas</TabsTrigger>
          <TabsTrigger value="Socios">Socios</TabsTrigger>
        </TabsList>
      </Tabs>

      <motion.div layout className="space-y-4">
        {empresasFiltradas.map((empresa: Empresa) => (
          <motion.div
            key={empresa.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-row items-center gap-4 p-4">
             
              <CardContent>
                <h3 className="font-semibold">{empresa.nombre}</h3>
                <p className="text-sm text-gray-500">{empresa.descripcion}</p>
                <p className="text-xs text-gray-400">{empresa.ubicacion}</p>
              </CardContent>
              <Building2 className="ml-auto text-gray-400" />
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
