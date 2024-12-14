<template>
  <div class="home">
    <header class="text-center py-10">
      <h1 class="text-4xl font-bold">Explora Propiedades Increíbles</h1>
    </header>
    <section v-if="loading" class="text-center">
      <p>Cargando propiedades...</p>
    </section>
    <section v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </section>
    <section v-else>
      
      <!-- <Carousel3D :properties="properties" /> -->
      <PropertyCarousel
        :properties="properties"
        @filter="fetchProperties"
      />
    </section>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useHome } from '../composables/useHome';

//import Carousel3D from '../components/Carousel3D.vue';
import PropertyCarousel from '../components/PropertyCarousel.vue';




const { properties, loading, error, fetchProperties } = useHome();



onMounted(() => {
  fetchProperties();
});
</script>
