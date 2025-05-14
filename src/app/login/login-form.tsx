"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormProvider } from "react-hook-form"
import { LoginFormValues, LoginSchema } from "../schemas/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import AuthUser from "@/utils/auth"
import { useRouter } from "next/navigation"
import { toast } from 'sonner';
import { ENDPOINTS } from "@/utils/endpoints"

export function LoginForm() {
  const router = useRouter()

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data: LoginFormValues) => {
    const result = await AuthUser(ENDPOINTS.login, data);

    console.log("Datos del formulario:", data);
    
    if (!result.ok) {
      toast.error(`Error: ${result.error}`);
      console.log(errors);
    }
    else {
      toast.success("Inició sesión correctamente");
      router.push('/')
    }
  };

  return (
    <FormProvider {...methods}>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" method="POST">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input id="username" type="text" placeholder="usuario123"
            {...register("username", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password"
            {...register("password", { required: true })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Iniciar sesión</Button> {/* El botón de envío dentro del form */}
        </CardFooter>
      </form>
    </Card>
    </FormProvider>
  )
}
