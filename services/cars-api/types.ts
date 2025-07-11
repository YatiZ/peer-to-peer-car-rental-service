interface Owner {
    name: string;
    rating: string; // could also be number if you prefer
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
    image: string;
    seats: number;
    transmission: string;
    fuel: string;
    rating: string; // could also be number
    review_count: number;
    features: Feature[];
    instant_book: boolean;
  }
  