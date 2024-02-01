// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
// 2. Define your collection(s)

// without schema
const starWarsCollection = defineCollection({
  type: "data",
});

// with schema
// const starWarsCollection = defineCollection({
//   type: "data",
//   schema: z.array(
//     z.object({
//       name: z.string(),
//       height: z.string().optional(),
//       mass: z.string().optional(),
//       homeworld: z.string().optional(),
//       films: z.array(z.string()).optional(),
//     })
//   ),
// });

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  starWars: starWarsCollection,
};
