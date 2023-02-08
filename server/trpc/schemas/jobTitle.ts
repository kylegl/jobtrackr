import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/trpc/schemas'

export const jobTitleAddInputSchema = z.object({
  title: z.string(),
})
export type JobTitleAddInput = z.infer<typeof jobTitleAddInputSchema>

export const jobTitleUpdateInputSchema = z.object({
  id: idSchema,
  title: z.string(),
})

export type JobTitleUpdateInput = z.infer<typeof jobTitleUpdateInputSchema>

export const jobTitleGetByIdInputSchema = idInputSchema
export type JobTitleGetByIdInput = z.infer<typeof jobTitleGetByIdInputSchema>

export const jobTitleDeleteInputSchema = idInputSchema
export type JobTitleDeleteInput = z.infer<typeof jobTitleDeleteInputSchema>

export const JobTitleListInputSchema = z.object({
  id: idSchema.optional(),
  title: z.string().optional(),
})
export type JobTitleListInput = z.infer<typeof JobTitleListInputSchema>
