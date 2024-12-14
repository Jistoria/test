import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchReservations } from '../services/reservationService';
import type { Reservation } from '../types/Reservation';

export const useReservationStore = defineStore('reservationStore', () => {
  // Tipamos el estado de las reservaciones
  const reservations = ref<Reservation[]>([]); 
  const isLoading = ref(false); 
  const error = ref<string | null>(null); 

  // Acción para cargar las reservaciones
  const loadReservations = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await fetchReservations(); // Llamamos al servicio
      reservations.value = data; // Guardamos las reservaciones
    } catch (err: any) {
      error.value = err.message || 'Error al cargar las reservaciones.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    reservations,
    isLoading,
    error,
    loadReservations,
  };
});
