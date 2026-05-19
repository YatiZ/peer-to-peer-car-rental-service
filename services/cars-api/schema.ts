import { z } from "zod";

export const CarDetailsSchema = z.object({
  name: z.string().min(1),
  plate_number: z.string().min(1),

  location: z.string(),

  latitude: z.number(),
  longitude: z.number(),

  price: z.number(), 

  seats: z.number(),

  transmission: z.enum([
    "automatic",
    "manual"
  ]),

  fuel: z.enum([
    "petrol",
    "diesel",
    "hybrid",
    "electric"
  ]),

  instant_book: z.boolean(),

  preview_image: z.string().url(),

  images: z.array(
    z.object({
      image_url: z.string().url()
    })
  ),

  features: z.array(
    z.object({
      feature: z.string()
    })
  ),
});

export type CarCreationPayload = z.infer<
  typeof CarDetailsSchema
>;