import { z } from 'zod'
import { idSchema } from '~~/server/trpc/schemas'

export const propertyAddInputSchema = z.object({
  address: z.string(),
  gateCode: z.string().optional(),
})
export type PropertyAddInput = z.infer<typeof propertyAddInputSchema>

export const propertyUpdateInputSchema = z.object({
  id: idSchema,
  address: z.string().optional(),
  gateCode: z.string().optional(),
})
export type propertyUpdateInput = z.infer<typeof propertyUpdateInputSchema>

export const propertyGetByIdInputSchema = z.object({
  id: idSchema,
})
export type PropertyGetByIdInput = z.infer<typeof propertyGetByIdInputSchema>

export const propertyDeleteInputSchema = z.object({
  id: idSchema,
})
export type PropertyDeleteInput = z.infer<typeof propertyDeleteInputSchema>

export const propertyListInputSchema = z.object({
  id: idSchema.optional(),
  address: z.string().optional(),
})
export type PropertyListInput = z.infer<typeof propertyListInputSchema>
