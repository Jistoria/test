import { ref, computed } from 'vue';
import { createReservation, checkAvailability } from '../../services/reservationService';
import { useAlert } from '../../plugins/sweetalert';


export const useReservation = (pricePerNight: number, propertyId: number) => {

    const alert = useAlert;
  // Fechas seleccionadas
  const startDate = ref<string | null>(null);
  const endDate = ref<string | null>(null);

  // Estados de disponibilidad
  const isCheckingAvailability = ref(false);
  const availabilityMessage = ref<string | null>(null);
  const isAvailable = ref<boolean | null>(null);

  // Estado de creación de reserva
  const isCreatingReservation = ref(false);
  const reservationError = ref<string | null>(null);

  // Validar que la fecha de fin sea mayor a la de inicio
  const isEndDateValid = computed(() => {
    if (!startDate.value || !endDate.value) return true;
    return new Date(endDate.value) > new Date(startDate.value);
  });

  // Cálculo de noches y precio total
  const totalNights = computed(() => {
    if (!startDate.value || !endDate.value || !isEndDateValid.value) return 0;
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  });

  const totalPrice = computed(() => totalNights.value * pricePerNight);

  // Verificar disponibilidad de las fechas seleccionadas
  const checkDatesAvailability = async () => {
    if (!startDate.value || !endDate.value || !isEndDateValid.value) return;

    isCheckingAvailability.value = true;
    availabilityMessage.value = null;
    try {
      const result = await checkAvailability(propertyId, startDate.value, endDate.value);
      isAvailable.value = result.available;
      availabilityMessage.value = result.message || null;
    } catch (error: any) {
      isAvailable.value = null;
      availabilityMessage.value = error.message || 'Error al comprobar la disponibilidad.';
    } finally {
      isCheckingAvailability.value = false;
    }
  };

  // Crear reservación
  const createReservationRequest = async () => {
    if (!startDate.value || !endDate.value || !isAvailable.value) {
      reservationError.value = 'Las fechas no están disponibles.';
      return;
    }

    isCreatingReservation.value = true;
    reservationError.value = null;

    try {
      const reservation = await createReservation(
        propertyId,
        startDate.value,
        endDate.value,
        totalNights.value,
        totalPrice.value
      );
        alert.success('Reservación creada', 'Tu reservación ha sido creada exitosamente.');
      return reservation; // Reservación creada
    } catch (err: any) {
      reservationError.value = err.message;
      alert.error('Error', reservationError.value || 'Unknown error');
    } finally {
      isCreatingReservation.value = false;
    }
  };

  return {
    startDate,
    endDate,
    totalNights,
    totalPrice,
    isEndDateValid,
    isAvailable,
    availabilityMessage,
    isCheckingAvailability,
    isCreatingReservation,
    reservationError,
    checkDatesAvailability,
    createReservationRequest,
  };
};
