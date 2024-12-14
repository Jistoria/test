import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/authStore';

import { useAlert } from '../../plugins/sweetalert';

export const useAuth = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const alert = useAlert;

  // Computed para usar el usuario del store
  const user = computed(() => authStore.user);

  const loading = ref(false); // Estado de carga

  // Función para iniciar sesión
  const handleLogin = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    try {
      await authStore.authLogin(credentials);
      alert.success('Bienvenido', 'Has iniciado sesión correctamente.');
      router.push('/'); // Redirige al dashboard
    } catch (error) {
      alert.error('Error', 'Las credenciales son incorrectas.');
    } finally {
      loading.value = false;
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    loading.value = true;
    try {
      await authStore.authLogout();
      alert.success('Adiós', 'Has cerrado sesión correctamente.');
      router.push('/'); // Redirige al inicio
    } catch (error) {
      alert.error('Error', 'Ha ocurrido un error al cerrar sesión.');
    } finally {
      loading.value = false;
    }
  };

  const handleCheckAuth = () => {
  
      authStore.authCheck();  

  };


  return {
    user,
    loading,
    handleLogin,
    handleLogout,
    handleCheckAuth
  };
};
