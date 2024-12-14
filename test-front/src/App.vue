<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import { onMounted } from 'vue';
import { useAuth } from './composables/auth/useAuth';

const { handleCheckAuth } = useAuth();

onMounted(() => {
  handleCheckAuth();
});
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
