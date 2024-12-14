import { ref, onMounted } from 'vue';
import { pluckPropertyTypes } from '../../services/propertyTypeService';

export const usePropertyTypes = () => {
  const propertyTypes = ref<{ id: number; type_name: string }[]>([]); // Arreglo para manejar los tipos de propiedad
  const error = ref<string | null>(null);
  const loading = ref(false);

  const loadPropertyTypes = async () => {
    loading.value = true;
    error.value = null;
    try {
      // Convierte el objeto en un arreglo
      const rawTypes = await pluckPropertyTypes();
      propertyTypes.value = Object.entries(rawTypes).map(([id, type_name]) => ({
        id: parseInt(id),
        type_name: String(type_name),
      }));
    } catch (e: any) {
      error.value = e.message || 'No se pudieron cargar los tipos de propiedad.';
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loadPropertyTypes();
  });

  return {
    propertyTypes,
    error,
    loading,
    loadPropertyTypes,
  };
};
