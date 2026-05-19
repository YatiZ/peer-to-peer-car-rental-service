interface Owner {
  id: number;
  email: string;
  username: string;
  user_type: "owner" | "renter" | string; 
  avatar: string; 
  phone: string;
  location: string;
  rating: number;
  joined_date: string; 
  is_verified: boolean;
}
  
  interface Feature {
    feature: string;
  }
  
export  interface Car {
    id: number;
    name: string;
    owner: Owner;
    location: string;
    distance: string;
    price: string; // could also be number if you want numeric price
    preview_image: string;
    seats: number;
    transmission: string;
    fuel: string;
    rating: string; // could also be number
    review_count: number;
    features: Feature[];
    instant_book: boolean;
  }

