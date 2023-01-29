import { z } from 'zod'
import { datetimeSchema, idInputSchema, idSchema, jobStatusSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createWorkOrderInputSchema = z.object({
  number: z.number(),
  description: z.string().optional(),
  isHourly: z.boolean(),
  hours: z.number().optional(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  companyId: idSchema.optional(),
  jobId: idSchema.optional(),
  status: jobStatusSchema,
})
export type CreateWorkOrderInput = z.infer<typeof createWorkOrderInputSchema>

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
  status: jobStatusSchema.optional(),
})

export type UpdateWorkOrderInput = z.infer<typeof updateWorkOrderInputSchema>

export const GetByIdWorkOrderInputSchema = idInputSchema
export type GetByIdWorkOrderInput = z.infer<typeof GetByIdWorkOrderInputSchema>

export const deleteWorkOrderInputSchema = idInputSchema
export type DeleteWorkOrderInput = z.infer<typeof deleteWorkOrderInputSchema>

export const WorkOrderListInputSchema = z.object({
  id: idSchema.optional(),
  jobId: idSchema.optional(),
})

// #endregion

export const workOrderRouter = router({
  add: publicProcedure
    .input(createWorkOrderInputSchema)
    .mutation(async ({ input }) => {
      const workOrder = await prisma.workOrder.create({
        data: input,
      })

      return workOrder
    }),
  delete: publicProcedure
    .input(deleteWorkOrderInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.workOrder.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdWorkOrderInputSchema)
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
