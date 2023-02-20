import { z } from 'zod'
import { datetimeSchema, idInputSchema, idSchema, jobStatusOptionsSchema } from '~~/server/trpc/schemas'

export const workOrderAddInputSchema = z.object({
  number: z.number(),
  description: z.string().optional(),
  isHourly: z.boolean(),
  hours: z.number().optional(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  companyId: idSchema.optional(),
  jobId: idSchema.optional(),
  status: jobStatusOptionsSchema,
})
export type WorkOrderAddInput = z.infer<typeof workOrderAddInputSchema>

export const workOrderUpdateInputSchema = z.object({
  id: idSchema,
  number: z.number().optional(),
  description: z.string().optional(),
  isHourly: z.boolean().optional(),
  hours: z.number().optional(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  companyId: idSchema.optional(),
  jobId: idSchema.optional(),
  status: jobStatusOptionsSchema.optional(),
})

export type WorkOrderUpdateInput = z.infer<typeof workOrderUpdateInputSchema>

export const workOrderGetByIdInputSchema = idInputSchema
export type WorkOrderGetByIdInput = z.infer<typeof workOrderGetByIdInputSchema>

export const workOrderDeleteInputSchema = idInputSchema
export type WorkOrderDeleteInput = z.infer<typeof workOrderDeleteInputSchema>

export const workOrderListInputSchema = z.object({
  jobId: idSchema.optional(),
}).optional()
export type WorkOrderListInput = z.infer<typeof workOrderListInputSchema>
