import { z } from "zod";

export const OrdenTrabajoEquipo = z.object({
  nOrdenTrabajo: z.string().describe('N° O Trabajo'),
  nOrdenServicio: z.string().describe('N° O Servicio'),
  inspector : z.string().describe('Inspector'),
  ruc: z.string().describe('RUC'),
  empresa: z.string().describe('Empresa'),
  empresa_matriz: z.string().describe('Empresa Matriz'),
  f_servicio: z.date().describe('F Servicio'),
  certificadora: z.string().describe('Certificadora'),
  tipo_unidad: z.array(z.string()).describe('Tipo Unidad'),
  placa: z.string().describe('Placa'),
  
  // f_factura: z.date().describe('F Factura'),
  // n_factura: z.string().describe('N° Factura'),
  // area: z.string().describe('Área'),
  // monto_sin_igv: z.number().describe('Monto Sin IGV'),
  // monto_con_igv: z.number().describe('Monto Con IGV'),
  // igv: z.number().describe('IGV'),
  // detraccion: z.number().describe('Detracción'),
  // verif_pago_detraccion: z.boolean().describe('Detracción'),
  // verif_factura: z.boolean().describe('Facturado'),
  // verif_pago: z.boolean().describe('Pago'),
  // dolares: z.number().describe('Dólares'),
});

export type OrdTrabEqFormValues = z.infer<typeof OrdenTrabajoEquipo>;