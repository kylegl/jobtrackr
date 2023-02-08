import { z } from 'zod'
import { datetimeSchema, idInputSchema, idSchema, jobStatusOptionsSchema } from '~~/server/trpc/schemas'

export const taskAddInputSchema = z.object({
  description: z.string().optional(),
  materials: z.string().optional(),
  hours: z.number().optional(),
  number: z.number(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  status: jobStatusOptionsSchema,
  workOrderId: idSchema,
})
export type TaskAddInput = z.infer<typeof taskAddInputSchema>

export const taskUpdateInputSchema = z.object({
  id: idSchema,
  description: z.string().optional(),
  materials: z.string().optional(),
  hours: z.number().optional(),
  number: z.number(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  status: jobStatusOptionsSchema.optional(),
  workOrderId: idSchema.optional(),
})

export type TaskUpdateInput = z.infer<typeof taskUpdateInputSchema>

export const taskGetByIdInputSchema = idInputSchema
export type TaskGetByIdInput = z.infer<typeof taskGetByIdInputSchema>

export const taskDeleteInputSchema = idInputSchema
export type TaskDeleteInput = z.infer<typeof taskDeleteInputSchema>

export const taskListInputSchema = z.object({
  id: idSchema.optional(),
  workOrderId: idSchema.optional(),
})
export type TaskListInput = z.infer<typeof taskListInputSchema>
