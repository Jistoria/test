import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Property } from '../types/Property';
import { getProperties, getPropertyDetails } from '../services/propertyService';
import { PropertyDetails } from '../types/PropertyDetails';

export const usePropertyStore = defineStore('propertyStore', () => {
  const storedProperties = ref<Property[]>([]);
  const propertyDetails = ref<PropertyDetails | null>(null);
  const error = ref<string | null>(null);

  const fetchProperties = async (
    typeId: number | null = null,
  ): Promise<Property[]> => {


      storedProperties.value = await getProperties(typeId);
    
    return storedProperties.value;
  };

  const fetchPropertyDetails = async (propertyId: number) => {
     propertyDetails.value = await getPropertyDetails(propertyId);
    return propertyDetails.value;
  };

  // Acción para limpiar el estado
  const clearPropertyDetails = () => {
    propertyDetails.value = null;

  };





  return { storedProperties, propertyDetails, fetchProperties, fetchPropertyDetails, clearPropertyDetails };
});
