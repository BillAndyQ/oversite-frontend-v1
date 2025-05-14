"use client";
import { SidebarBase } from "@/app/components/SidebarBase";
import SidebarLink from "@/app/components/SidebarLink";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { ENDPOINTS_CLIENT } from "@/utils/endpoints";
import { BarChart3, CogIcon, CreditCard, HardHat, Home, Inbox, Settings, Users } from "lucide-react";

import { usePathname } from "next/navigation";


export function Sidebar() {
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <SidebarBase>
      {/* ORDENES DE TRABAJO */}
      <SidebarGroup>
        <SidebarGroupLabel>Ordenes de trabajo</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink href={ENDPOINTS_CLIENT.admin.ordTrabEq}>
                  <CogIcon className="mr-2 size-4" />
                  <span>Equipos</span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink href={ENDPOINTS_CLIENT.admin.ordTrabPer}>
                  <HardHat className="mr-2 size-4" />
                  <span>Personas</span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>


            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink href={ENDPOINTS_CLIENT.admin.ordTrabReportes}>
                  <HardHat className="mr-2 size-4" />
                  <span>Reportes</span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink href={ENDPOINTS_CLIENT.admin.ordTrabImformenes}>
                  <HardHat className="mr-2 size-4" />
                  <span>Informes</span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* DATOS */}
      <SidebarGroup>
        <SidebarGroupLabel>Datos</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink href={ENDPOINTS_CLIENT.admin.ordTrabEmpresas}>
                  <Home className="mr-2 size-4" />
                  <span>Empresas</span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink href={ENDPOINTS_CLIENT.admin.ordTrabAreas}>
                  <BarChart3 className="mr-2 size-4" />
                  <span>Áreas</span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink href={ENDPOINTS_CLIENT.admin.ordTrabCertificadores}>
                  <Inbox className="mr-2 size-4" />
                  <span>Certificadores</span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Cursos */}
      <SidebarGroup>
        <SidebarGroupLabel>Cursos</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Settings className="mr-2 size-4" />
                  <span>Lista cursos</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Configuración */}
      <SidebarGroup>
        <SidebarGroupLabel>Configuración</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Settings className="mr-2 size-4" />
                  <span>Ajustes</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

    </SidebarBase>
  );
}