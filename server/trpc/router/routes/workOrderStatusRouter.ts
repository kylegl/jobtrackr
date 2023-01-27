import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createWorkOrderStatusInputShape = z.object({
  name: z.string(),
})
export type CreateWorkOrderStatusInput = z.infer<typeof createWorkOrderStatusInputShape>

export const updateWorkOrderStatusInputSchema = z.object({
  id: idSchema,
  name: z.string(),
})

export type UpdateWorkOrderStatusInput = z.infer<typeof updateWorkOrderStatusInputSchema>

export const GetByIdWorkOrderStatusInputShape = idInputSchema
export type GetByIdWorkOrderStatusInput = z.infer<typeof GetByIdWorkOrderStatusInputShape>

export const deleteWorkOrderStatusInputShape = idInputSchema
export type DeleteWorkOrderStatusInput = z.infer<typeof deleteWorkOrderStatusInputShape>

export const WorkOrderStatusListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const workOrderStatusRouter = router({
  add: publicProcedure
    .input(createWorkOrderStatusInputShape)
    .mutation(async ({ input }) => {
      const workOrderStatus = await prisma.workOrderStatus.create({
        data: input,
      })

      return workOrderStatus
    }),
  delete: publicProcedure
    .input(deleteWorkOrderStatusInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.workOrderStatus.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdWorkOrderStatusInputShape)
    .query(async ({ input }) => await prisma.workOrderStatus.findUnique({ where: input })),
  list: publicProcedure
    .input(WorkOrderStatusListInputSchema)
    .query(async ({ input }) => {
      const workOrderStatus = await prisma.workOrderStatus.findMany({ where: input })

      return workOrderStatus
    }),
  update: publicProcedure
    .input(updateWorkOrderStatusInputSchema)
    .mutation(async ({ input }) => {
      const { id, name } = input
      const workOrderStatus = await prisma.workOrderStatus.update({
        where: { id },
        data: {
          name,
        },
      })
      return workOrderStatus
    }),
})
