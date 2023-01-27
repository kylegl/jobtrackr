import { z } from 'zod'
import { datetimeSchema, idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createTaskInputShape = z.object({
  description: z.string().optional(),
  materials: z.string().optional(),
  hours: z.number().optional(),
  number: z.number(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  statusId: idSchema,
  workOrderId: idSchema,
})
export type CreateTaskInput = z.infer<typeof createTaskInputShape>

export const updateTaskInputSchema = z.object({
  id: idSchema,
  description: z.string().optional(),
  materials: z.string().optional(),
  hours: z.number().optional(),
  number: z.number(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  statusId: idSchema.optional(),
  workOrderId: idSchema.optional(),
})

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>

export const GetByIdTaskInputShape = idInputSchema
export type GetByIdTaskInput = z.infer<typeof GetByIdTaskInputShape>

export const deleteTaskInputShape = idInputSchema
export type DeleteTaskInput = z.infer<typeof deleteTaskInputShape>

export const TaskListInputSchema = z.object({
  id: idSchema.optional(),
  workOrderId: idSchema.optional(),
})

// #endregion

export const taskRouter = router({
  add: publicProcedure
    .input(createTaskInputShape)
    .mutation(async ({ input }) => {
      const task = await prisma.task.create({
        data: input,
      })

      return task
    }),
  delete: publicProcedure
    .input(deleteTaskInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.task.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdTaskInputShape)
    .query(async ({ input }) => await prisma.task.findUnique({ where: input })),
  list: publicProcedure
    .input(TaskListInputSchema)
    .query(async ({ input }) => {
      const tasks = await prisma.task.findMany({ where: input })

      return tasks
    }),
  update: publicProcedure
    .input(updateTaskInputSchema)
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
        statusId,
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
          statusId,
          workOrderId,
        },
      })
      return task
    }),
})
