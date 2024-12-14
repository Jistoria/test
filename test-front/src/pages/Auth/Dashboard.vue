<template>
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold mb-6">Mis Reservaciones</h1>
  
      <!-- Mostrar estados de carga o error -->
      <div v-if="isLoading" class="text-center text-gray-500">
        Cargando tus reservaciones...
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>
      <div v-else-if="reservations.length === 0" class="text-center text-gray-500">
        Aún no tienes reservaciones.
      </div>
  
      <!-- Mostrar reservaciones -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="reservation in reservations"
          :key="reservation.id"
          class="bg-white shadow-md rounded-lg overflow-hidden border"
        >
          <!-- Imagen de la propiedad -->
          <img
            :src="reservation.property.image_url"
            :alt="reservation.property.name"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <!-- Nombre de la propiedad -->
            <h2 class="text-lg font-semibold mb-2">
              {{ reservation.property.name }}
            </h2>
  
            <!-- Fechas de la reserva -->
            <p class="text-gray-600 mb-1">
              Fechas: {{ reservation.start_date }} - {{ reservation.end_date }}
            </p>
  
            <!-- Detalles adicionales -->
            <p class="text-gray-600 mb-1">
              Dirección: {{ reservation.property.location.address }},
              {{ reservation.property.location.city }}
            </p>
            <p class="text-gray-600 mb-1">
              Noches: {{ reservation.total_nights }}
            </p>
            <p class="text-gray-600 mb-1">
              Total: ${{ reservation.total_price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useFetchReservations } from '../../composables/reservation/useFetchReservations';

  
  const { reservations, isLoading, error, loadReservations } = useFetchReservations();
  
  onMounted(() => {
    loadReservations();
  });
  </script>
  