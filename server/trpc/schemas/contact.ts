import { z } from 'zod'
import type { IdInput } from './common'
import { idInputSchema } from './common'
import { idSchema } from '~~/server/trpc/schemas'

export const contactAddInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  companyId: idSchema.optional(),
  jobId: idSchema.optional(),
})
export type ContactAddInput = z.infer<typeof contactAddInputSchema>

export const contactUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  companyId: idSchema.optional(),
  jobId: idSchema.optional(),
})

export type ContactUpdateInput = z.infer<typeof contactUpdateInputSchema>

export const createOrAddContactInputSchema = contactAddInputSchema.or(idInputSchema)
export type CreateOrAddContactInput = z.infer<typeof createOrAddContactInputSchema>
export type CreateOrAddContactInputConditional<
  T extends CreateOrAddContactInput | IdInput,
> = T extends ContactAddInput ? ContactAddInput : IdInput

export const contactGetByIdInputSchema = idInputSchema
export type ContactGetByIdInput = z.infer<typeof contactGetByIdInputSchema>

export const contactDeleteInputSchema = idInputSchema
export type ContactDeleteInput = z.infer<typeof contactDeleteInputSchema>

export const contactListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})
export type ContactListInput = z.infer<typeof contactListInputSchema>
