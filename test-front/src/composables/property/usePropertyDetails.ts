import { ref, watch } from 'vue';
import { useAlert } from '../../plugins/sweetalert';
import { PropertyDetails } from '../../types/PropertyDetails';
import { usePropertyStore } from '../../store/usePropertyStore';

export const usePropertyDetails = () => {
  const propertiesStore = usePropertyStore();
  const alert = useAlert;

  // Estados reactivos locales
  const isOpen = ref(false); 
  const propertyDetails = ref<PropertyDetails | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Método para obtener los detalles de una propiedad
  const fetchPropertyDetails = async (propertyId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedDetails = await propertiesStore.fetchPropertyDetails(propertyId);
      propertyDetails.value = fetchedDetails;
      isOpen.value = true; 
    } catch (e) {
      error.value = 'No se pudieron cargar los detalles de la propiedad.';
      alert.error('Error', error.value);
    } finally {
      loading.value = false;
    }
  };

  // Método para limpiar los datos (puede usarse al cerrar el modal)
  const clearPropertyDetails = () => {
    propertyDetails.value = null;
    error.value = null;
    isOpen.value = false;
  };

  const closeModal = () => {
    isOpen.value = false;
    propertyDetails.value = null;
  };

  // Sincronizar estados locales con el store usando `watch`
  watch(
    () => propertiesStore.propertyDetails, // Observa los detalles de la propiedad en el store
    (newDetails) => {
      propertyDetails.value = newDetails;
    }
  );



  return {
    isOpen,
    propertyDetails,
    loading,
    error,
    fetchPropertyDetails,
    clearPropertyDetails,
    closeModal,
  };
};
