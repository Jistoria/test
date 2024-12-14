<template>
    <div class="property-details-container py-10 px-6 max-w-6xl mx-auto">
      <div v-if="loading" class="text-center">
        <p class="text-xl text-gray-500">Cargando detalles...</p>
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        <p class="text-xl">{{ error }}</p>
      </div>
      <div v-else>
        <!-- Título y precio -->
        <div class="mb-6">
          <h1 class="text-4xl font-bold text-gray-800">{{ propertyDetails?.name }}</h1>
          <p class="text-lg text-gray-600 mt-2">
            Ubicación: {{ propertyDetails?.location.address }}, {{ propertyDetails?.location.city }}, {{ propertyDetails?.location.state?.state_name }}, {{ propertyDetails?.location.country?.country_name }}
          </p>
          <p class="text-2xl font-semibold text-green-600 mt-4">
            Precio por noche: ${{ propertyDetails?.price_per_night }}
          </p>
        </div>
  
        <!-- Descripción -->
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">Descripción</h2>
          <p class="text-gray-600 leading-relaxed">{{ propertyDetails?.description }}</p>
        </div>
  
        <!-- Galería -->
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Galería</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <img
              :src="propertyDetails?.image_url"
              alt="Imagen de propiedad"
              class="w-full h-40 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
  
        <!-- Disponibilidad -->
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Disponibilidad</h2>
          <div v-if="availability.length > 0">
            <ul class="text-gray-600 leading-relaxed">
              <li
                v-for="(range, index) in availability"
                :key="index"
                class="mb-2"
              >
                Del {{ range.start }} al {{ range.end }}
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="text-red-500">No hay fechas disponibles actualmente.</p>
          </div>
        </div>
  
        <!-- Botón de reservar -->
        <div class="mt-10 text-center">
          <ReservationModal :pricePerNight="propertyDetails?.price_per_night ?? 0" :propertyId="propertyDetails?.id ?? 1" />
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { computed, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePropertyDetails } from '../composables/property/usePropertyDetails';
  import ReservationModal from '../components/ReservationModal.vue';
  
  // Datos de la propiedad
  const route = useRoute();
  const { propertyDetails, loading, error, fetchPropertyDetails, clearPropertyDetails } = usePropertyDetails();
  
  // Disponibilidad formateada
  const availability = computed(() => {
    return (
      propertyDetails.value?.availability?.map((item) => ({
        start: new Date(item.start_date).toLocaleDateString(),
        end: new Date(item.end_date).toLocaleDateString(),
      })) || []
    );
  });
  
  // Cargar datos de la propiedad
  const loadPropertyDetails = async () => {
    const propertyId = Number(route.params.id);
    clearPropertyDetails(); // Limpiar datos antiguos
    await fetchPropertyDetails(propertyId); // Cargar datos nuevos
  };
  
  // Escuchar cambios en la ruta
  watchEffect(() => {
    loadPropertyDetails();
  });
  </script>
  