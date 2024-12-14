<template>
    <div class="carousel-container relative">
      <!-- Filtro por tipo de propiedad -->
      <div class="mb-4 flex justify-center items-center gap-4">
  <label for="property-type" class="text-gray-700 font-semibold">Filtrar por tipo:</label>
  <select
    id="property-type"
    class="p-2 border border-gray-300 rounded-lg shadow-sm"
    v-model="selectedType"
    :disabled="loading"
    @change="applyFilter"
  >
    <option value="">Todos</option>
    <option
      v-for="type in propertyTypes"
      :key="type.id"
      :value="type.id"
    >
      {{ type.type_name }}
    </option>
  </select>
</div>

  
      <!-- Mensaje de lista vacía -->
      <div v-if="properties.length === 0" class="text-center py-10">
        <p class="text-gray-500 text-lg">No hay propiedades disponibles para este tipo.</p>
      </div>
  
      <!-- Carrusel -->
      <div v-else class="carousel relative overflow-hidden w-full max-w-4xl mx-auto">
        <!-- Carrusel Items -->
        <div
          v-for="(property, index) in properties"
          :key="property.id"
          class="carousel-item"
          :class="{ active: index === activeIndex }"
          @click="viewDetails(property.id)"
        >
          <img
            :src="property.image_url"
            :alt="property.name"
            class="object-cover w-full h-64 md:h-80 rounded-lg shadow-lg"
          />
          <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <h3 class="text-lg font-bold">{{ property.name }}</h3>
            <p class="text-sm">Ubicación ID: {{ property.location_id }}</p>
            <p class="text-sm">${{ property.price_per_night }} por noche</p>
          </div>
        </div>
  
        <!-- Botones de Navegación -->
        <button
          @click="prev"
          class="prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition duration-300"
        >
          &laquo;
        </button>
        <button
          @click="next"
          class="next absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition duration-300"
        >
          &raquo;
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import type { Property } from '../types/Property';
  import { usePropertyTypes } from '../composables/property/usePropertyType';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Props para recibir propiedades
   const props = defineProps({
    properties: {
      type: Array as () => Property[],
      required: true,
    },
  });
  
  const activeIndex = ref(0); 
  const selectedType = ref(''); 
  const emit = defineEmits(['filter']);
  
  const { propertyTypes, loading } = usePropertyTypes();
  
  
  const applyFilter = () => {
  const filterId = selectedType.value ? parseInt(selectedType.value) : null;
  emit('filter', filterId);
};

  
  // Navegación en el carrusel
  const prev = () => {
    activeIndex.value =
      activeIndex.value > 0 ? activeIndex.value - 1 : props.properties.length - 1;
  };
  
  const next = () => {
    activeIndex.value =
      activeIndex.value < props.properties.length - 1 ? activeIndex.value + 1 : 0;
  };
  
  // Ver detalles de una propiedad
  const viewDetails = (propertyId: number) => {
    router.push({ name: 'PropertyDetails', params: { id: propertyId } });
  };
  </script>
  
  <style scoped>
  .carousel-container {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }
  
  .carousel {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .carousel-item {
    min-width: 100%;
    position: absolute;
    opacity: 0;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }
  
  .carousel-item.active {
    opacity: 1;
    transform: translateX(0);
    position: relative;
    z-index: 10;
  }
  
  .carousel img {
    border-radius: 10px;
  }
  
  .prev,
  .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 20;
    font-size: 1.5rem;
  }
  
  .prev {
    left: 10px;
  }
  
  .next {
    right: 10px;
  }
  </style>
  