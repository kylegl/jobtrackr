import {
  taskAddInputSchema,
  taskDeleteInputSchema,
  taskGetByIdInputSchema,
  taskListInputSchema,
  taskUpdateInputSchema,
} from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

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
    .input(taskListInputSchema)
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
