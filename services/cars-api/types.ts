
  
  interface Feature {
    feature: string;
  }
  
  export interface CarImage {
  id: number;
  image_url: string;
}


export interface PickupLocation {
  address: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
}

export interface Owner {
  id: number;
  email: string;
  username: string;
  user_type: string;
  avatar: string;
  phone: string;
  location: string;
  rating: number;
  joined_date: string;
  is_verified: boolean;
}
export interface Car {
  id: number;
  plate_number: string;
  name: string;
  owner: Owner;
  location: string;
  latitude: number;
  longitude: number;
  price: string;
  preview_image: string;
  seats: number;
  transmission: string;
  fuel: string;
  instant_book: boolean;
  images: CarImage[];
  features: Feature[];
  pickup: PickupLocation[];
}

