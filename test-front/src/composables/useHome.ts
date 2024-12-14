import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '../plugins/sweetalert';
import { usePropertyStore } from '../store/usePropertyStore';
import { Property } from '../types/Property';

export const useHome = () => {
  const router = useRouter();
  const alert = useAlert;
  const propertyStore = usePropertyStore();

  // Estados reactivos dentro del composable
  const properties = ref<Property[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Método para cargar propiedades
  const fetchProperties = async (
    typeId: number | null = null,
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedProperties = await propertyStore.fetchProperties(typeId);
      properties.value = fetchedProperties; // Actualiza el estado local
    } catch (e) {
      error.value = 'No se pudieron cargar las propiedades';
      alert.error('Error', error.value); // Usa la alerta en caso de fallo
    } finally {
      loading.value = false;
    }
  };

  // Navegar a una propiedad específica
  const goToProperty = (id: number) => {
    router.push(`/property/${id}`);
  };

  return {
    properties,
    loading,
    error,
    fetchProperties,
    goToProperty,
  };
};
