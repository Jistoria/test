import api from './api'; 

export interface PropertyType {
    id: number;
    type_name: string;
}

export const pluckPropertyTypes = async (): Promise<PropertyType[]> => {
  try {
    const response = await api.get('/pluck-property-types');
    return response.data as PropertyType[];
  } catch (error) {
    console.error('Error al obtener los tipos de propiedad:', error);
    throw new Error('No se pudieron cargar los tipos de propiedad. Inténtalo nuevamente.');
  }
};