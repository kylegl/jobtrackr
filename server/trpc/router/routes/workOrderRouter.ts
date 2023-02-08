import {
  workOrderAddInputSchema,
  workOrderDeleteInputSchema,
  workOrderGetByIdInputSchema,
  workOrderListInputSchema,
  workOrderUpdateInputSchema,
} from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

export const workOrderRouter = router({
  add: publicProcedure
    .input(workOrderAddInputSchema)
    .mutation(async ({ input }) => {
      const workOrder = await prisma.workOrder.create({
        data: input,
      })

      return workOrder
    }),
  delete: publicProcedure
    .input(workOrderDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.workOrder.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(workOrderGetByIdInputSchema)
    .query(async ({ input }) => await prisma.workOrder.findUnique({ where: input })),
  list: publicProcedure
    .input(workOrderListInputSchema)
    .query(async ({ input }) => {
      const workOrders = await prisma.workOrder.findMany({ where: input })

      return workOrders
    }),
  update: publicProcedure
    .input(workOrderUpdateInputSchema)
    .mutation(async ({ input }) => {
      const {
        id,
        number,
        description,
        isHourly,
        hours,
        startAt,
        dueAt,
        closedAt,
        companyId,
        jobId,
        status,
      } = input
      const workOrder = await prisma.workOrder.update({
        where: { id },
        data: {
          description,
          hours,
          isHourly,
          number,
          startAt,
          dueAt,
          closedAt,
          companyId,
          jobId,
          status,
        },
      })
      return workOrder
    }),
})
