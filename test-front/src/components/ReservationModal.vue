<template>
    <div>
      <button
        class="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
        @click="openModal"
      >
        Reservar Ahora
      </button>
  
      <!-- Modal de reserva -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="modal-box relative max-w-md w-full bg-white rounded-lg p-6 shadow-md">
          <button
            class="btn btn-sm btn-circle absolute right-2 top-2"
            @click="closeModal"
          >
            ✕
          </button>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Realizar Reserva</h2>
  
          <!-- Fecha de Inicio -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Fecha de Inicio</label>
            <input
              type="date"
              class="input input-bordered w-full"
              v-model="startDate"
              @change="checkAvailability"
            />
          </div>
  
          <!-- Fecha de Fin -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Fecha de Fin</label>
            <input
              type="date"
              class="input input-bordered w-full"
              v-model="endDate"
              @change="checkAvailability"
            />
            <p v-if="!isEndDateValid" class="text-red-500 text-sm mt-1">
              La fecha de fin debe ser mayor que la fecha de inicio.
            </p>
          </div>
  
          <!-- Mensaje de Disponibilidad -->
          <div v-if="availabilityMessage" class="mb-4">
            <p :class="{'text-red-500': !isAvailable, 'text-green-500': isAvailable}" class="text-sm">
              {{ availabilityMessage }}
            </p>
          </div>
  
          <!-- Detalles de la Reservación -->
          <div class="mb-4">
            <p class="text-gray-600">
              Noches seleccionadas:
              <span class="font-semibold">{{ totalNights }}</span>
            </p>
            <p class="text-gray-600">
              Precio total:
              <span class="font-semibold">${{ totalPrice }}</span>
            </p>
          </div>
  
          <!-- Botón de Confirmar -->
          <div class="text-center">
            <button
              class="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
              :disabled="!isAvailable || isCreatingReservation || isCheckingAvailability"
              @click="confirmReservation"
            >
              Confirmar Reserva
            </button>
          </div>
  
          <!-- Mensaje de Error -->
          <p v-if="reservationError" class="text-red-500 text-sm mt-4 text-center">
            {{ reservationError }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useReservation } from '../composables/reservation/useReservation';
  
  const props = defineProps({
    pricePerNight: {
      type: Number,
      required: true,
    },
    propertyId: {
      type: Number,
      required: true,
    },
  });
  
  const {
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
  } = useReservation(props.pricePerNight, props.propertyId);
  
  const isModalOpen = ref(false);
  
  const openModal = () => (isModalOpen.value = true);
  const closeModal = () => (isModalOpen.value = false);
  
  const checkAvailability = async () => {
    await checkDatesAvailability();
  };
  
  const confirmReservation = async () => {
    try {
      const reservation = await createReservationRequest();
      alert(`Reserva confirmada: ${JSON.stringify(reservation)}`);
      closeModal();
    } catch (err) {
      console.error('Error al confirmar reserva:', err);
    }
  };
  </script>
  