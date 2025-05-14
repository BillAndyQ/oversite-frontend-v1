import { Bell, Search, UploadIcon, User } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"

export default function AppNavbar() {
  return (
    <header className="hidden md:flex h-12 items-center gap-4 border-b shadow-sm px-4 lg:px-6">
      <SidebarTrigger className="h-4 w-4"/>
      <Separator orientation="vertical" className="h-4" />

      <div className="hidden md:flex">
        <span className="text-md font-bold">Ordenes de trabajo</span>
      </div>
      <div className="relative ml-auto hidden sm:flex-1 md:grow-0 md:basis-1/3 lg:basis-1/4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Buscar..." className="w-full bg-background pl-8 md:w-[300px] lg:w-[320px]" />
      </div>

      <div className="ml-auto flex items-center gap-2">

        <Button variant="outline" className="ml-auto hidden sm:flex text-es h-7 shadow-none rounded-sm border-es px-2" size="sm">
          Subir
          <UploadIcon/>
        </Button>

        <Button variant="outline" className="ml-auto bg-gray-900 text-es text-white shadow-none border-es" size="sm">
          + Nueva Orden
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
          <span className="sr-only">Notificaciones</span>
        </Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Facturación</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
  )
}
