"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Link from 'next/link';
import { SidebarMenuSubButton } from "@/components/ui/sidebar";

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SidebarLink = ({ href, children, className = '' }: SidebarLinkProps) => {
  const [isMounted, setIsMounted] = useState(false); // Estado para asegurarse de que se monta en el cliente
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true); // Marca como montado solo en el cliente
  }, []);

  // Solo renderiza después de que se haya montado el componente en el cliente
  if (!isMounted) return null;

  const isActive = pathname === href;  // Verificar si la ruta coincide

  return (
    <SidebarMenuSubButton asChild>
      <Link
        href={href}
        className={`${isActive ? 'bg-white border border-blue-400' : ''} ${className}`}  // Agregar clase condicional
      >
        <div className={`${isActive ? 'text-blue-500 font-semibold' : ''} flex items-center gap-1 text-es`}>
          {children}
        </div>
      </Link>
    </SidebarMenuSubButton>
    
  );
};

export default SidebarLink;
