<template>
    <div class="carousel-container">
      <!-- Controles del carrusel -->
      <div class="controls">
        <input
          v-for="(_, index) in properties.length"
          :key="index"
          type="radio"
          name="position"
          :checked="index + 1 === position"
          @change="changePosition(index + 1)"
        />
      </div>
  
      <!-- Carrusel principal -->
      <main id="carousel" ref="carousel">
        <div
          v-for="(property, index) in properties"
          :key="property.id"
          class="item"
          :style="{ '--offset': index + 1 }"
        >
          <img :src="property.image_url" :alt="property.name" />
          <div class="details">
            <h3>{{ property.name }}</h3>
            <p>{{ property.location_id }}</p>
            <p>${{ property.price_per_night }} por noche</p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { Property } from '../types/Property';
  
  defineProps({
    properties: {
      type: Array as () => Property[],
      required: true,
    },
  });
  
  // Estado reactivo para la posición actual
  const position = ref(1);
  
  // Referencia al elemento raíz del carrusel
  const carousel = ref<HTMLElement | null>(null);
  
  // Cambia la posición del carrusel
  const changePosition = (newPosition: number) => {
    position.value = newPosition;
  };
  
  // Actualiza la variable CSS `--position` en el elemento del carrusel
  watch(position, (newPosition) => {
    if (carousel.value) {
      carousel.value.style.setProperty('--position', newPosition.toString());
    }
  });
  </script>
  
  <style scoped>
  /* Contenedor principal */
  .carousel-container {
    height: 600px;
    margin: 0;
    display: grid;
    grid-template-rows: 500px 100px;
    grid-template-columns: 1fr 30px 30px 30px 30px 30px 1fr;
    align-items: center;
    justify-items: center;
  }
  
  /* Carrusel 3D */
  main#carousel {
    grid-row: 1 / 2;
    grid-column: 1 / 8;
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transform-style: preserve-3d;
    perspective: 600px;
    --items: 5; /* Número máximo de elementos visibles */
    --middle: 3; /* Índice del elemento central */
    --position: 1; /* Posición actual (reactiva en Vue) */
    pointer-events: none;
  }
  
  /* Elementos del carrusel */
  div.item {
    position: absolute;
    width: 300px;
    height: 400px;
    background-color: #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    --r: calc(var(--position) - var(--offset));
    --abs: max(calc(var(--r) * -1), var(--r));
    transition: all 0.25s linear;
    transform: rotateY(calc(-10deg * var(--r)))
      translateX(calc(-300px * var(--r)));
    z-index: calc((var(--position) - var(--abs)));
  }
  
  /* Imagen en el carrusel */
  div.item img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  /* Detalles de la propiedad */
  div.item .details {
    text-align: center;
    font-size: 1rem;
  }
  
  /* Controles */
  .controls {
    grid-column: 2 / 7;
    grid-row: 2 / 3;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .controls input[type='radio'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #007bff;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
  }
  
  .controls input[type='radio']:checked {
    background-color: #007bff;
  }
  </style>
  