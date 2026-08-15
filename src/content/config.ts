import { defineCollection, z } from 'astro:content';
const releaseSchema = z.object({
  title: z.string(), group: z.string(), year: z.number().int().optional(), platform: z.string(),
  credits: z.array(z.object({ role: z.string(), name: z.string() })).default([]),
  description: z.string(), download_url: z.string().url().optional(), screenshot: z.string().optional(),
  file_id_diz: z.string(),
});
const skyline = defineCollection({ type: 'content', schema: releaseSchema });
const kosmosDesign = defineCollection({ type: 'content', schema: releaseSchema });
const tropicdreams = defineCollection({ type: 'content', schema: releaseSchema });
const esprit = defineCollection({ type: 'content', schema: releaseSchema });
export const collections = { skyline, 'kosmos-design': kosmosDesign, tropicdreams, esprit };
