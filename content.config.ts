import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  link: z.string(),
  date: z.date()
});

export default defineContentConfig({
  collections: {
    projects_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/projects/*.md',
        prefix: '',
      },
      schema: projectSchema
    }),
    projects_tr: defineCollection({
      type: 'page',
      source: {
        include: 'tr/projects/*.md',
        prefix: '',
      },
      schema: projectSchema
    })
  }
})
