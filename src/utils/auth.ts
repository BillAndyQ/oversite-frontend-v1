'use server';
import { cookies } from 'next/headers';
import { encrypt } from './crypto';
import { log } from 'console';

interface ApiResponse<T = unknown, E = unknown> {
  ok: boolean;
  data?: T;
  error?: E;
  token?: string;
  role?: string; 
}


const roleMap: Record<string, string> = {
  administrador: 'admin',
  contador: 'contabilidad',
  inspector: 'inspector',
  gerente: 'gerente'
};

async function AuthUser(url: string, data: unknown): Promise<ApiResponse> {
  const API_BACKEND = process.env.URL_BACKEND;
  console.log("url ", url);
        const cookieStore = await cookies(); // Usa await para obtener el objeto cookies
  
  try {
    const response = await fetch(`${API_BACKEND}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(url);
    
    if (response.ok) {
      const result: ApiResponse = await response.json();

      // Si la respuesta es exitosa y contiene un token, guardarlo como cookie
      let roleUser: String = result.role!;

      if (result?.role) {
        console.log("En auth.ts", result.role);
        cookieStore.set({
          name: 'role',
          value: result.role,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 24 * 60 * 60, // 24 horas en segundos
        });
      }

      if (result?.token) {
        cookieStore.set({
          name: 'authToken',
          value: encrypt(result.token),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 24 * 60 * 60, // 24 horas en segundos
        });
        
      }
      
      return { ok: true, data: result };
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

export default AuthUser;