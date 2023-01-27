import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createTaskStatusInputShape = z.object({
  name: z.string(),
})
export type CreateTaskStatusInput = z.infer<typeof createTaskStatusInputShape>

export const updateTaskStatusInputSchema = z.object({
  id: idSchema,
  name: z.string(),
})

export type UpdateTaskStatusInput = z.infer<typeof updateTaskStatusInputSchema>

export const GetByIdTaskStatusInputShape = idInputSchema
export type GetByIdTaskStatusInput = z.infer<typeof GetByIdTaskStatusInputShape>

export const deleteTaskStatusInputShape = idInputSchema
export type DeleteTaskStatusInput = z.infer<typeof deleteTaskStatusInputShape>

export const TaskStatusListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const taskStatusRouter = router({
  add: publicProcedure
    .input(createTaskStatusInputShape)
    .mutation(async ({ input }) => {
      const taskStatus = await prisma.taskStatus.create({
        data: input,
      })

      return taskStatus
    }),
  delete: publicProcedure
    .input(deleteTaskStatusInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.taskStatus.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdTaskStatusInputShape)
    .query(async ({ input }) => await prisma.taskStatus.findUnique({ where: input })),
  list: publicProcedure
    .input(TaskStatusListInputSchema)
    .query(async ({ input }) => {
      const taskStatus = await prisma.taskStatus.findMany({ where: input })

      return taskStatus
    }),
  update: publicProcedure
    .input(updateTaskStatusInputSchema)
    .mutation(async ({ input }) => {
      const { id, name } = input
      const taskStatus = await prisma.taskStatus.update({
        where: { id },
        data: {
          name,
        },
      })
      return taskStatus
    }),
})
