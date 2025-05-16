"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import SearchInput from "@/app/components/busqueda";

interface Empresa {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
  ubicacion: string;
  empresasAsociadas?: Empresa[];
}

type DataType = {
  All: Empresa[];
  Empresas: Empresa[];
  Socios: Empresa[];
};

const empresaEjemplo: Empresa = {
  id: 10,
  nombre: "Empresa Asociada X",
  descripcion: "Empresa vinculada a Green Energy",
  foto: "",
  ubicacion: "Medellín, Colombia",
};

const data: DataType = {
  All: [
    {
      id: 1,
      nombre: "Tech Solutions",
      descripcion: "Soluciones tecnológicas para empresas",
      foto: "",
      ubicacion: "Lima, Perú",
    },
    {
      id: 2,
      nombre: "Green Energy",
      descripcion: "Energía renovable para un futuro sostenible",
      foto: "",
      ubicacion: "Bogotá, Colombia",
    },
    {
      id: 3,
      nombre: "HealthCare Plus",
      descripcion: "Servicios médicos y de salud avanzada",
      foto: "",
      ubicacion: "Ciudad de México, México",
    },
    {
      id: 4,
      nombre: "EduTech Pro",
      descripcion: "Plataformas de educación virtual",
      foto: "",
      ubicacion: "Santiago, Chile",
    },
    {
      id: 5,
      nombre: "AgroVida",
      descripcion: "Tecnología para el sector agrícola",
      foto: "",
      ubicacion: "Quito, Ecuador",
    },
    {
      id: 6,
      nombre: "FinanSmart",
      descripcion: "Servicios financieros digitales",
      foto: "",
      ubicacion: "Buenos Aires, Argentina",
    },
  ],
  Empresas: [
    {
      id: 1,
      nombre: "Tech Solutions",
      descripcion: "Soluciones tecnológicas para empresas",
      foto: "",
      ubicacion: "Lima, Perú",
    },
    {
      id: 4,
      nombre: "EduTech Pro",
      descripcion: "Plataformas de educación virtual",
      foto: "",
      ubicacion: "Santiago, Chile",
    },
    {
      id: 5,
      nombre: "AgroVida",
      descripcion: "Tecnología para el sector agrícola",
      foto: "",
      ubicacion: "Quito, Ecuador",
    },
  ],
  Socios: [
    {
      id: 2,
      nombre: "Green Energy",
      descripcion: "Energía renovable para un futuro sostenible",
      foto: "",
      ubicacion: "Bogotá, Colombia",
      empresasAsociadas: [
        {
          id: 11,
          nombre: "EcoSoluciones",
          descripcion: "Consultoría en sostenibilidad energética",
          foto: "",
          ubicacion: "Medellín, Colombia",
        },
        {
          id: 12,
          nombre: "Renova Corp",
          descripcion: "Sistemas solares y eólicos",
          foto: "",
          ubicacion: "Cartagena, Colombia",
        },
      ],
    },
    {
      id: 3,
      nombre: "HealthCare Plus",
      descripcion: "Servicios médicos y de salud avanzada",
      foto: "",
      ubicacion: "Ciudad de México, México",
      empresasAsociadas: [
        {
          id: 13,
          nombre: "Meditech Partners",
          descripcion: "Innovación en equipos médicos",
          foto: "",
          ubicacion: "Guadalajara, México",
        },
      ],
    },
    {
      id: 6,
      nombre: "FinanSmart",
      descripcion: "Servicios financieros digitales",
      foto: "",
      ubicacion: "Buenos Aires, Argentina",
      empresasAsociadas: [
        {
          id: 14,
          nombre: "CréditoFácil",
          descripcion: "Créditos y microfinanzas",
          foto: "",
          ubicacion: "Montevideo, Uruguay",
        },
        {
          id: 15,
          nombre: "Inversión Abierta",
          descripcion: "Fondos de inversión para pymes",
          foto: "",
          ubicacion: "Asunción, Paraguay",
        },
      ],
    },
  ],
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
            {/* Acordeón solo en Empresas o Socios */}
            {activeTab === "Empresas" || activeTab === "Socios" ? (
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${empresa.id}`}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold">{empresa.nombre}</h3>
                        <p className="text-sm text-gray-500">{empresa.descripcion}</p>
                        <p className="text-xs text-gray-400">{empresa.ubicacion}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {empresa.empresasAsociadas && empresa.empresasAsociadas.length > 0 ? (
                      <div className="space-y-2 pl-4">
                        {empresa.empresasAsociadas.map((asociada) => (
                          <Card key={asociada.id} className="p-3 bg-gray-50">
                            <h4 className="font-medium">{asociada.nombre}</h4>
                            <p className="text-sm text-gray-500">{asociada.descripcion}</p>
                            <p className="text-xs text-gray-400">{asociada.ubicacion}</p>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No hay empresas asociadas.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              // Si está en la pestaña "All", muestra sin acordeón
              <Card className="flex flex-row items-center gap-4 p-4">
                <CardContent>
                  <h3 className="font-semibold">{empresa.nombre}</h3>
                  <p className="text-sm text-gray-500">{empresa.descripcion}</p>
                  <p className="text-xs text-gray-400">{empresa.ubicacion}</p>
                </CardContent>
                <Building2 className="ml-auto text-gray-400" />
              </Card>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
