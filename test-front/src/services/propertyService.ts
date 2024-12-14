import { Property } from '../types/Property';
import { PropertyDetails } from '../types/PropertyDetails';
import api from './api';

export const getProperties = async (
    typeId: number | null = null,
): Promise<Property[]> => {
  try {
    const params = typeId ? { property_type: typeId } : {};
    const response = await api.get('/properties', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las propiedades:', error);
    throw error;
  }
};


export const getPropertyDetails = async (id: number): Promise<PropertyDetails> => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data as PropertyDetails;
  } catch (error) {
    console.log('Error al obtener los detalles de la propiedad:', error);
    console.error('Error al obtener los detalles de la propiedad:', error);
    throw error;
  }
}

export const checkAvailability = async (propertyId: number, startDate: string, endDate: string) => {
    try {
      const response = await api.post(`/check-availability/${propertyId}`, {
        start_date: startDate,
        end_date: endDate,
      });
      return response.data; // Supongamos que la respuesta contiene { available: true/false, message: "..." }
    } catch (error) {
      console.error('Error al comprobar disponibilidad:', error);
      throw new Error('Error al comprobar la disponibilidad. Inténtalo nuevamente.');
    }
  };