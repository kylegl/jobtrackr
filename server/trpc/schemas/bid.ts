import { z } from 'zod'
import {
  bidStatusOptionsSchema,
  createOrAddContactInputSchema,
  datetimeSchema,
  idSchema,
} from '~~/server/trpc/schemas'

export const bidAddInputSchema = z.object({
  name: z.string(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  total: z.number().optional(),
  hours: z.number().optional(),
  sentAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  typeId: idSchema.optional(),
  status: bidStatusOptionsSchema,
  contacts: z.array(createOrAddContactInputSchema).optional(),
  companyId: idSchema.optional(),
  propertyId: idSchema.optional(),
})
export type BidAddInput = z.infer<typeof bidAddInputSchema>

export const bidUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  total: z.number().optional(),
  hours: z.number().optional(),
  sentAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  typeId: idSchema.optional(),
  status: bidStatusOptionsSchema.optional(),
  companyId: idSchema.optional(),
  propertyId: idSchema.optional(),
  contacts: z.array(createOrAddContactInputSchema).optional(),
  // TODO update when bid & work order router is in
  jobs: z.array(z.string()).optional(),
})
export type BidUpdateInput = z.infer<typeof bidUpdateInputSchema>

export const bidGetByIdInputSchema = z.object({
  id: idSchema,
})
export type BidGetByIdInput = z.infer<typeof bidGetByIdInputSchema>

export const bidDeleteInputSchema = z.object({
  id: idSchema,
})
export type BidDeleteInput = z.infer<typeof bidDeleteInputSchema>

export const bidListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
  companyId: idSchema.optional(),
})
export type BidListInput = z.infer<typeof bidListInputSchema>
