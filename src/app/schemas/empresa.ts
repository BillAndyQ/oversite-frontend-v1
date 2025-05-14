import { z } from "zod";

export const EmpresaSchema = z.object({
  razon_social: z .string(),
  ruc: z .string()
});

export type EmpresaFormValues = z.infer<typeof EmpresaSchema>;