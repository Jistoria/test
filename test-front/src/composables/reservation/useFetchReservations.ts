import { ref, watch } from 'vue';
import { useReservationStore } from '../../store/reservationStore';

export const useFetchReservations = () => {
  const reservationStore = useReservationStore();

  // Crear estados reactivos locales
  const reservations = ref(reservationStore.reservations);
  const isLoading = ref(reservationStore.isLoading);
  const error = ref(reservationStore.error);

  // Verificar cambios en el store para mantener la reactividad
  watch(
    () => reservationStore.reservations,
    (newReservations) => {
      reservations.value = newReservations;
    }
  );

  watch(
    () => reservationStore.isLoading,
    (newLoading) => {
      isLoading.value = newLoading;
    }
  );

  watch(
    () => reservationStore.error,
    (newError) => {
      error.value = newError;
    }
  );

  // Método para cargar las reservaciones
  const loadReservations = async () => {
    await reservationStore.loadReservations();
  };

  return {
    reservations,
    isLoading,
    error,
    loadReservations,
  };
};
