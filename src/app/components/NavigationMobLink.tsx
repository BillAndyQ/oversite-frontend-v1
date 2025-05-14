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

const NavigationMobLink = ({ href, children, className = '' }: SidebarLinkProps) => {
  const [isMounted, setIsMounted] = useState(false); // Estado para asegurarse de que se monta en el cliente
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true); // Marca como montado solo en el cliente
  }, []);

  // Solo renderiza después de que se haya montado el componente en el cliente
  if (!isMounted) return null;

  const isActive = pathname === href;  // Verificar si la ruta coincide

  return (
    <Link
      href="#"
      className="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-gray-900 data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:text-gray-50"
      prefetch={false}
    >
          {children}
    </Link>
    
  );
};

export default NavigationMobLink;
