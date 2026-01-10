import { z } from 'zod';

export const DokployfileSchema = z.object({
  version: z.literal("1"),
  meta: z.object({
    slug: z.string().describe("Matches 'id' in meta.json"),
    name: z.string(),
    version: z.string(),
    description: z.string().optional(),
    logo: z.string().optional().describe("Path or URL"),
    tags: z.array(z.string()).optional(),
    links: z.record(z.string().url()).optional().describe("Matches meta.json { github: '...', website: '...' }")
  }),
  template: z.object({
    compose: z.string().default("docker-compose.yml"),
    config: z.string().default("template.toml"),
    instructions: z.string().optional()
  })
});

export type Dokployfile = z.infer<typeof DokployfileSchema>;
