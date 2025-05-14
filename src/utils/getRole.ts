'use server';
import { cookies } from 'next/headers';

async function getRole(){
    
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get('role')?.value;
    console.log("Rol del backend:", role);
    
    return role;
  } catch (error) {
    return error;
    
  }
}

export default getRole;