export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface Location {
    id: number;
    state_id: number;
    country_id: number;
    address: string;
    city: string;
  }
  
  export interface PropertyType {
    id: number;
    type_name: string;
  }
  
  export interface Property {
    id: number;
    name: string;
    description: string;
    image_url: string;
    location_id: number;
    property_type_id: number;
    price_per_night: string;
    location: Location;
    property_type: PropertyType;
  }
  
  export interface Reservation {
    id: number;
    user_id: number;
    property_id: number;
    start_date: string;
    end_date: string;
    total_nights: number;
    total_price: string;
    property: Property;
    user: User;
  }
  