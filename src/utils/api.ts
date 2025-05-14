'use server';
import { cookies } from 'next/headers';
import { decrypt } from './crypto';

interface ApiResponse<T = unknown, E = unknown> {
  ok: boolean;
  data?: T;
  error?: E;
}

async function postDataToServer<T, U>(url: string, data: T): Promise<ApiResponse<U>> {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${decrypt(token!)}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result: U = await response.json();
      console.log("Respuesta del backend:", result);
      return { ok: true, data: result };
    } else {
      const errorData: U = await response.json(); // Assuming error structure might be similar
      console.error("Error en la petición al backend (desde Server Action):", errorData);
      return { ok: false, error: errorData };
    }
  } catch (error) {
    console.error("Error de conexión al backend (desde Server Action):", error);
    return { ok: false, error: { message: 'Error de conexión al backend' } };
  }
}

export default postDataToServer;