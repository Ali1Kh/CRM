import { string, z } from 'zod';

const IProperty_details = z.object({
  title: z.string(),
  text: z.string(),
});

export const formSchema = z.object({
  images: z.array(z.string()),
  title: z.string().max(250, 'Title too long.').min(5, 'Title too short'),
  description: z
    .string()
    .max(600, 'Description too long.')
    .min(10, 'Description too short.'),
  location: z.array(z.number()),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  property_details: z.array(IProperty_details).optional(),
});

// title: '',
//       location: '',
//       description: '',
//       propery_details: [],
//       bedrooms: null,
//       bathrooms: null,
//       area: '',
//       images: [],
