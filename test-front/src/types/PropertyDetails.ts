export interface Location {
    id: number;
    state_id: number;
    country_id: number;
    city: string;
    address: string;
    state: {
      id: number;
      state_name: string;
    };
    country: {
      id: number;
      country_name: string;
    };
  }
  
  export interface Availability {
    id: number;
    property_id: number;
    start_date: string;
    end_date: string;
  }
  
  export interface PropertyDetails {
    id: number;
    name: string;
    description: string;
    image_url: string;
    location_id: number;
    property_type_id: number;
    price_per_night: number;
    location: Location;
    availability: Availability[];
  }
  