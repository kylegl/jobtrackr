import { z } from 'zod'
import { datetimeSchema, idInputSchema, idSchema, jobStatusSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createTaskInputSchema = z.object({
  description: z.string().optional(),
  materials: z.string().optional(),
  hours: z.number().optional(),
  number: z.number(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  status: jobStatusSchema,
  workOrderId: idSchema,
})
export type CreateTaskInput = z.infer<typeof createTaskInputSchema>

export const updateTaskInputSchema = z.object({
  id: idSchema,
  description: z.string().optional(),
  materials: z.string().optional(),
  hours: z.number().optional(),
  number: z.number(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  status: jobStatusSchema.optional(),
  workOrderId: idSchema.optional(),
})

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>

export const GetByIdTaskInputSchema = idInputSchema
export type GetByIdTaskInput = z.infer<typeof GetByIdTaskInputSchema>

export const deleteTaskInputSchema = idInputSchema
export type DeleteTaskInput = z.infer<typeof deleteTaskInputSchema>

export const TaskListInputSchema = z.object({
  id: idSchema.optional(),
  workOrderId: idSchema.optional(),
})

// #endregion

export const taskRouter = router({
  add: publicProcedure
    .input(createTaskInputSchema)
    .mutation(async ({ input }) => {
      const task = await prisma.task.create({
        data: input,
      })

      return task
    }),
  delete: publicProcedure
    .input(deleteTaskInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.task.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdTaskInputSchema)
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
