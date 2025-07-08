
export type Car = {
    id: string;
    brand: string;
    main_img: string;
    brand_logo: string;
    description: string;
    model: string;
    year: number;
    transmission: string;
    color: string;
    passengers: number;
    suitcases: number;
    gas_type: string;
    price_per_day: number;
    status: string;
    image: string[]; // array of image URLs
  };
  
export type Cars = Car[];