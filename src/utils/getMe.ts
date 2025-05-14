'use server';
import { ENDPOINTS } from '@/utils/endpoints';
import { decrypt } from './crypto';
import { cookies } from 'next/headers';

interface ApiResponse<T = unknown, E = unknown> {
  ok: boolean;
  data?: T;
  role?: string; // Especificamos que 'role' es string
  error?: string | E; // Permitimos que 'error' sea string o el tipo genérico E
}

const roleMap: Record<string, string> = {
  administrador: 'admin',
  contador: 'contabilidad',
  inspector: 'inspector',
  gerente: 'gerente'
};

// Definimos un tipo más específico para el resultado exitoso de /me
interface MeResponseData {
  id: number;
  username: string;
  email: string;
  role?: string; // El rol podría venir aquí también, dependiendo de tu backend
  [key: string]: unknown; // Permite otras propiedades si las hay
}

export default async function getMe(): Promise<ApiResponse<MeResponseData>> {
  const API_BACKEND = process.env.URL_BACKEND;
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  try {
    const response = await fetch(`${API_BACKEND}${ENDPOINTS.me}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${decrypt(token!)}`,
      },
    });
    
    if (response.ok) {
      const result: ApiResponse<MeResponseData> = await response.json();
      console.log("Respuesta del backend:", result);
      console.log("Rol del backend:", result.role);

      // Aseguramos que result.role sea una cadena antes de buscar en roleMap
      const roleFromBackend = typeof result.role === 'string' ? result.role.toLowerCase() : '';
      const clientRole = roleMap[roleFromBackend] || 'user';
      console.log(clientRole);
      
      // const cookieStore = await cookies();
      // cookieStore.set({
      //   name: 'role',
      //   value: clientRole,
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'strict',
      //   path: '/',
      //  });
       
      const role = cookieStore.get('role')?.value;

      console.log("Rol del cliente:", role); 
      return { ok: true, data: result.data, role     : clientRole }; // Devolvemos el rol mapeado
    } else {
      const errorData = await response.json();
      console.error("Error en la petición al backend (desde Server Action):", errorData);
      return { ok: false, error: errorData };
    }

  } catch (error) {
    console.error("Error de conexión al backend (desde Server Action):", error);
    return { ok: false, error: { message: 'Error de conexión al backend' } };
  }
}