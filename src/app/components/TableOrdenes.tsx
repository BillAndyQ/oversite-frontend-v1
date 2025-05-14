"use client";
import TablaDinamic from "@/app/components/TableDinamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem,DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DownloadIcon, Search, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";   
import { z } from "zod";


interface EquipoTablaProps<T extends z.ZodRawShape> {
  schema: z.ZodObject<T>;
  data: z.infer<z.ZodObject<T>>[];
}
 
const TableOrdenes = <T extends z.ZodRawShape>({ schema, data }: EquipoTablaProps<T>) => {
  const [columnas, setColumnas] = useState<
    { id: string; nombre: string; visible: boolean }[]
  >(
    Object.keys(schema.shape).map((key) => ({
      id: key,
      nombre: schema.shape[key as keyof typeof schema.shape]?.description || key,
      visible: true,
    }))
  );

  const handleVisibilidadColumna = (id: string) => {
    setColumnas((prev) =>
      prev.map((columna) =>
        columna.id === id ? { ...columna, visible: !columna.visible } : columna
      )
    );
  };

  const handleDownload = (format: string) => {
    // Implementar la lógica de descarga aquí
    console.log(`Descargando en formato: ${format}`);
  }

  return (
    <div className="rounded-sm sm:shadow-xs flex-grow border border-white sm:border-gray-100 px-2 sm:px-0 bg-white w-full sm:w-[10rem]">
      <div className="text-sm font-bold mb-2 sm:mb-0 space-x-2 py-2 gap-2 sm:gap-1 sm:h-12 sm:px-2 sm:ps-3 flex flex-wrap justify-between items-center">
        <div className="flex items-center w-full sm:w-min">
          <span className="text-xl sm:text-sm md:w-min">Equipos</span>
        </div>
        <div className="space-x-2 flex items-center w-full sm:w-min">
          <div className="relative sm:ml-auto flex-1 w-full sm:w-full md:grow-0 md:basis-1/4 lg:basis-1/4">
            <Search className="absolute left-2.5 top-3 sm:top-2 h-4 w-4 text-muted-foreground"/>
            <Input
              type="search"
              placeholder="N° Trabajo"
              className="h-10 sm:h-8 sm:text-es text-gray-200 rounded-2xl sm:rounded-md bg-gray-50 sm:bg-background sm:border-gray-200 pl-8 md:w-[300px] lg:w-[320px]"
            />
          </div>
          {/* <div className="flex font-medium items-center text-xs space-x-2 h-7 rounded-sm border bg-white px-2">
            <span>+ Contabilidad</span>
            <Checkbox
              checked={selectColumnsContabilidad}
              onCheckedChange={handleSelectColumnsContabilidad}
              aria-label="Columnas Contabilidad"
            />
          </div> */}

          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto text-es sm:h-7 shadow-none hidden sm:flex rounded-sm border-es px-2"
                size="sm"
              >
                Descargar <DownloadIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-sm">
              <DropdownMenuItem className="py-1" onClick={() => handleDownload("csv")}>
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem className="py-1" onClick={() => handleDownload("excel")}>
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="py-1" onClick={() => handleDownload("pdf")}>
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden sm:flex">
              <Button
                variant="outline"
                className="ml-auto text-xs h-7 shadow-none rounded-sm border-es ps-2 pe-1"
              >
                View <SlidersHorizontal className="ml-.5 h-3 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columnas.map((columna) => (
                <DropdownMenuCheckboxItem
                  key={columna.id}
                  checked={columna.visible}
                  onCheckedChange={() => handleVisibilidadColumna(columna.id)}
                >
                  {columna.nombre}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <TablaDinamic schema={schema} data={data} columnasVisibles={columnas} />
      </div>
    </div>
  );
};

export default TableOrdenes;