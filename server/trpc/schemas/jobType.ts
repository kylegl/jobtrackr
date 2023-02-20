import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/trpc/schemas'

export const jobTypeAddInputSchema = z.object({
  name: z.string(),
})
export type JobTypeAddInput = z.infer<typeof jobTypeAddInputSchema>

export const jobTypeUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string(),
})

export type JobTypeUpdateInput = z.infer<typeof jobTypeUpdateInputSchema>

export const jobTypeGetByIdInputSchema = idInputSchema
export type JobTypeGetByIdInput = z.infer<typeof jobTypeGetByIdInputSchema>

export const jobTypeDeleteInputSchema = idInputSchema
export type JobTypeDeleteInput = z.infer<typeof jobTypeDeleteInputSchema>

export const jobTypeListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})
export type JobTypeListInput = z.infer<typeof jobTypeListInputSchema>
