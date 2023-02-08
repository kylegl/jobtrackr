import { z } from 'zod'
import { idSchema } from '~~/server/trpc/schemas'

export const companyAddInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})
export type CompanyAddInput = z.infer<typeof companyAddInputSchema>

export const companyUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})
export type CompanyUpdateInput = z.infer<typeof companyUpdateInputSchema>

export const companyGetByIdInputSchema = z.object({
  id: idSchema,
})
export type CompanyGetByIdInput = z.infer<typeof companyGetByIdInputSchema>

export const companyDeleteInputSchema = z.object({
  id: idSchema,
})
export type CompanyDeleteInput = z.infer<typeof companyDeleteInputSchema>

export const companyListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})
export type CompanyListInput = z.infer<typeof companyListInputSchema>
