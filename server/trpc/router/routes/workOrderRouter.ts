import { z } from 'zod'
import { datetimeSchema, idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createWorkOrderInputShape = z.object({
  number: z.number(),
  description: z.string().optional(),
  isHourly: z.boolean(),
  hours: z.number().optional(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  companyId: idSchema.optional(),
  jobId: idSchema.optional(),
  statusId: idSchema,
})
export type CreateWorkOrderInput = z.infer<typeof createWorkOrderInputShape>

export const updateWorkOrderInputSchema = z.object({
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
  statusId: idSchema.optional(),
})

export type UpdateWorkOrderInput = z.infer<typeof updateWorkOrderInputSchema>

export const GetByIdWorkOrderInputShape = idInputSchema
export type GetByIdWorkOrderInput = z.infer<typeof GetByIdWorkOrderInputShape>

export const deleteWorkOrderInputShape = idInputSchema
export type DeleteWorkOrderInput = z.infer<typeof deleteWorkOrderInputShape>

export const WorkOrderListInputSchema = z.object({
  id: idSchema.optional(),
  jobId: idSchema.optional(),
})

// #endregion

export const workOrderRouter = router({
  add: publicProcedure
    .input(createWorkOrderInputShape)
    .mutation(async ({ input }) => {
      const workOrder = await prisma.workOrder.create({
        data: input,
      })

      return workOrder
    }),
  delete: publicProcedure
    .input(deleteWorkOrderInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.workOrder.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdWorkOrderInputShape)
    .query(async ({ input }) => await prisma.workOrder.findUnique({ where: input })),
  list: publicProcedure
    .input(WorkOrderListInputSchema)
    .query(async ({ input }) => {
      const workOrders = await prisma.workOrder.findMany({ where: input })

      return workOrders
    }),
  update: publicProcedure
    .input(updateWorkOrderInputSchema)
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
        statusId,
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
          statusId,
        },
      })
      return workOrder
    }),
})
