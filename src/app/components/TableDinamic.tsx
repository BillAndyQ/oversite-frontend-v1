"use client";
import React from 'react';
import { z } from 'zod';
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react";
import { ArrowUpDown } from 'lucide-react';

interface Props<T extends z.ZodRawShape> {
  schema: z.ZodObject<T>;
  data: z.infer<z.ZodObject<T>>[];
  columnasVisibles: { id: string; nombre: string; visible: boolean }[]; // Nueva prop
}

const TablaDinamic = <T extends z.ZodRawShape>({ schema, data, columnasVisibles }: Props<T>, ) => {
  // const keys = Object.keys(schema.shape).filter(key => typeof key === 'string') as string[];
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const columnasForMobile = ["nOrdenTrabajo", "nOrdenServicio", "f_servicio"];

  // Filtrar las columnas visibles
  const keys = columnasVisibles
    .filter((columna) => columna.visible)
    .map((columna) => columna.id);

  useEffect(() => {
    if (data && data.length > 0) {
      if (selectAll) {
        setSeleccionados(data.map((_, index) => index));
      } else {
        setSeleccionados([]);
      }
    } else {
      setSeleccionados([]);
    }
  }, [selectAll, data]);

  const formatValue = (value: unknown) => {
    if (value instanceof Date) {
      return new Date(value).toLocaleDateString();
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return String(value);
  };

  const handleSeleccionFila = (id: number) => {
    setSeleccionados((prevSeleccionados) => { // Renombramos 'prev' a 'prevSeleccionados' para mayor claridad
      if (prevSeleccionados.includes(id)) {
        return prevSeleccionados.filter((itemId) => itemId !== id);
      } else {
        return [...prevSeleccionados, id];
      }
    });
    // Actualizar el estado de "seleccionar todos" al cambiar la selección individual
    setSeleccionados((prevSeleccionados) => { // Volvemos a usar el callback para obtener el estado actualizado
      if (data && prevSeleccionados.length === data.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      return prevSeleccionados; // Necesitas devolver el estado actualizado aquí también
    });
  };

  const handleSelectAllChange = (checked: boolean) => {
    setSelectAll(checked);
  };

  return (
    <div className='overflow-x-auto w-full'>
    <table className="min-w-full table-auto">
      <thead>
        <tr className='border-y'>
          <th className='w-0 sm:w-2 h-7 sm:ps-3 pe-2'>
            {/* {data && data.length > 0 && (
                <div className='h-7 flex items-center hidden sm:block justify-center'>
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAllChange}
                    aria-label="Seleccionar todas las filas"
                  />
                </div>
            )} */}
          </th>
          {keys.map((key) =>
           {
            const isMobileHidden = columnasForMobile.includes(key);

            return (
              <th className={`${!isMobileHidden ? 'hidden md:table-cell' : ''}`} key={key}>
                <div className='flex items-center gap-1' >
                  <ArrowUpDown className="h-3 w-3" />
                  <span className='text-head-table'>{schema.shape[key as keyof z.ZodRawShape]?.description || key}</span>
                </div>
              </th>
            );
           }
          
          )}
          <th className='w-1.5'>
          </th>
        </tr>
      </thead>
      <tbody>
        {!data || data.length === 0 ? (
          <tr>
            <td colSpan={keys.length + 1}>No hay datos para mostrar.</td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index} className='hover:bg-gray-100 cursor-pointer border-b'>
              <td className='w-0 sm:w-2 sm:ps-3 sm:pe-2'>            
                {/* <div className='h-7 flex items-center hidden sm:block justify-center'>
                  <Checkbox
                  className='m-0'
                    checked={seleccionados.includes(index)}
                    onCheckedChange={() => handleSeleccionFila(index)}
                    aria-label={`Seleccionar fila ${index + 1}`}
                  />
                </div> */}
              </td>
              {keys.map((key) => {
                const isMobileHidden = columnasForMobile.includes(key);
                return (
                  <td
                    className={`font-normal border-b px-1.5 py-3 sm:py-1.5 text-es text-gray-900 truncate ${!isMobileHidden ? 'hidden md:table-cell' : ''}`}
                    key={key}
                  >
                    {formatValue(item[key as keyof z.infer<z.ZodObject<T>>])}
                  </td>
                );
              })}

              <td className='w-1.5 border-b'></td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <div className='h-10 flex px-2.5 justify-end items-center gap-0.5 text-gray-900'>
      <button className='border text-es h-min px-2 py-0.5 rounded-xs font-bold'>Prev</button>
      <button className='border text-es h-min px-2 py-0.5 rounded-xs font-semibold'>1</button>
      <button className='border text-es h-min px-2 py-0.5 rounded-xs font-semibold'>2</button>
      <button className='border text-es h-min px-2 py-0.5 rounded-xs font-bold'>Next</button>
    </div>
    </div>
  );
};

export default TablaDinamic;