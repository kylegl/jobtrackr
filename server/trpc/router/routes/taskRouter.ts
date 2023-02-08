import { z } from 'zod'
import { datetimeSchema, idInputSchema, idSchema, jobStatusOptionsSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

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

export const TaskListInputSchema = z.object({
  id: idSchema.optional(),
  workOrderId: idSchema.optional(),
})
export type TaskListInput = z.infer<typeof TaskListInputSchema>

// #endregion

export const taskRouter = router({
  add: publicProcedure
    .input(taskAddInputSchema)
    .mutation(async ({ input }) => {
      const task = await prisma.task.create({
        data: input,
      })

      return task
    }),
  delete: publicProcedure
    .input(taskDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.task.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(taskGetByIdInputSchema)
    .query(async ({ input }) => await prisma.task.findUnique({ where: input })),
  list: publicProcedure
    .input(TaskListInputSchema)
    .query(async ({ input }) => {
      const tasks = await prisma.task.findMany({ where: input })

      return tasks
    }),
  update: publicProcedure
    .input(taskUpdateInputSchema)
    .mutation(async ({ input }) => {
      const {
        id,
        description,
        materials,
        hours,
        number,
        startAt,
        dueAt,
        closedAt,
        status,
        workOrderId,
      } = input
      const task = await prisma.task.update({
        where: { id },
        data: {
          description,
          materials,
          hours,
          number,
          startAt,
          dueAt,
          closedAt,
          status,
          workOrderId,
        },
      })
      return task
    }),
})
