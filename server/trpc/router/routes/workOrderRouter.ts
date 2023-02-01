import { z } from 'zod'
import { datetimeSchema, idInputSchema, idSchema, jobStatusOptionsSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

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

export const WorkOrderListInputSchema = z.object({
  jobId: idSchema.optional(),
}).optional()
export type WorkOrderListInput = z.infer<typeof WorkOrderListInputSchema>

// #endregion

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
    .input(WorkOrderListInputSchema)
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
