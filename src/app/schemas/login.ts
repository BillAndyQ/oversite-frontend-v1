import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." })
    .max(20, { message: "El nombre de usuario no puede tener más de 20 caracteres." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "El nombre de usuario solo puede contener letras, números y guiones bajos.",
    }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(100, { message: "La contraseña no puede tener más de 100 caracteres." }), // Puedes ajustar la longitud máxima
});

export type LoginFormValues = z.infer<typeof LoginSchema>;