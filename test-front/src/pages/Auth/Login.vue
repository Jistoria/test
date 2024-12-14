<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form @submit.prevent="handleSubmit" class="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-4">Inicia Sesión</h1>
        <div>
          <label for="email" class="block text-sm font-medium">Correo Electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Escribe tu correo"
            class="input input-bordered w-full mt-1"
          />
        </div>
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Escribe tu contraseña"
            class="input input-bordered w-full mt-1"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary w-full mt-6"
          :disabled="loading"
        >
          <span v-if="loading">Cargando...</span>
          <span v-else>Iniciar Sesión</span>
        </button>
        
      </form>

       
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../../composables/auth/useAuth';

      const { handleLogin, loading } = useAuth();
      const email = ref('');
      const password = ref('');
  
      const handleSubmit = () => {
        handleLogin({ email: email.value, password: password.value });
      };

        
</script>
  
  <style scoped>
  /* Puedes personalizar estilos aquí */
  </style>
  