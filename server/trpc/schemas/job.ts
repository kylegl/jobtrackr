import { z } from 'zod'
import { createOrAddContactInputSchema, datetimeSchema, idSchema, jobStatusOptionsSchema } from '~~/server/trpc/schemas'

export const jobAddInputSchema = z.object({
  name: z.string(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  contractTotal: z.number().optional(),
  invoicedTotal: z.number().optional(),
  paidTotal: z.number().optional(),
  hours: z.number().optional(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  notes: z.string().optional(),
  typeId: idSchema.optional(),
  status: jobStatusOptionsSchema,
  contacts: z.array(createOrAddContactInputSchema).optional(),
  companyId: idSchema.optional(),
  propertyId: idSchema.optional(),
  // TODO update when bid & work order router is in
  bids: z.array(z.string()).optional(),
  workOrders: z.array(z.string()).optional(),
})
export type JobAddInput = z.infer<typeof jobAddInputSchema>

export const jobUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  contractTotal: z.number().optional(),
  invoicedTotal: z.number().optional(),
  paidTotal: z.number().optional(),
  hours: z.number().optional(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  notes: z.string().optional(),
  typeId: idSchema.optional(),
  status: jobStatusOptionsSchema.optional(),
  companyId: idSchema.optional(),
  propertyId: idSchema.optional(),
  contacts: z.array(createOrAddContactInputSchema).optional(),
  // TODO update when bid & work order router is in
  bids: z.array(z.string()).optional(),
  workOrders: z.array(z.string()).optional(),
})
export type JobUpdateInput = z.infer<typeof jobUpdateInputSchema>

export const jobGetByIdInputSchema = z.object({
  id: idSchema,
})
export type JobGetByIdInput = z.infer<typeof jobGetByIdInputSchema>

export const jobDeleteInputSchema = z.object({
  id: idSchema,
})
export type JobDeleteInput = z.infer<typeof jobDeleteInputSchema>

export const jobListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
  companyId: idSchema.optional(),
})
export type JobListInput = z.infer<typeof jobListInputSchema>
