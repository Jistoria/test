import { Reservation } from '../types/Reservation';
import api from './api'; 


export const fetchReservations = async (): Promise<Reservation[]> => {
    try {
      const response = await api.get('/reservations');
      return response.data as Reservation[]; // Tipamos explícitamente la respuesta
    } catch (error: Error | any) {
      console.error('Error al obtener las reservaciones:', error);
      throw new Error(
        error.response?.data?.message || 'No se pudieron cargar las reservaciones. Inténtalo nuevamente.'
      );
    }
  };


export const checkAvailability = async (propertyId: number, startDate: string, endDate: string) => {
    try {
      const response = await api.post(`/check-availability/${propertyId}`, {
        start_date: startDate,
        end_date: endDate,
      });
  
      // Retornamos el objeto directamente, incluyendo "available" y "message"
      return response.data;
    } catch (error) {
      console.error('Error al comprobar disponibilidad:', error);
  
      // En caso de error (por ejemplo, 500), lanzamos un mensaje estándar
      throw new Error('Error al comprobar la disponibilidad. Inténtalo nuevamente.');
    }
  };

  export const createReservation = async (
    propertyId: number,
    startDate: string,
    endDate: string,
    totalNights: number,
    totalPrice: number
  ) => {
    try {
      const response = await api.post(`/reservations`, {
        start_date: startDate,
        end_date: endDate,
        property_id: propertyId,
        total_nights: totalNights,
        total_price: totalPrice,
      });
      return response.data; // La respuesta de la API (reservación creada)
    } catch (error: Error | any) {
      console.error('Error al crear la reserva:', error);
      throw new Error(
        error.response?.data?.message || 'No se pudo crear la reserva. Inténtalo nuevamente.'
      );
    }
  };