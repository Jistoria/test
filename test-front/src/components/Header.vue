<template>
    <header class="header">
      <nav class="navbar">
        <div class="logo">
          <router-link to="/">ReservaNow</router-link>
        </div>
        <ul class="nav-links">
          <li v-if="user">
            <router-link to="/dashboard" class="btn-dashboard">Mis Reservaciones</router-link>
            <span class="user-info">Hola, {{ user.name }}</span>
            <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
          </li>
          <li v-else>
            <router-link to="/login" class="btn-login">Iniciar Sesión</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  import { useAuth } from '../composables/auth/useAuth';
  
  const { user, handleLogout } = useAuth();
  </script>
  
  <style scoped>
  .header {
    background-color: #333;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .nav-links li {
    display: inline-block;
  }
  
  .btn-login,
  .btn-logout,
  .btn-dashboard {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
   
  }
  
  .btn-login:hover,
  .btn-logout:hover,
  .btn-dashboard:hover {
    background-color: #0056b3;
  }
  
  .user-info {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 1rem;
  }
  </style>
  