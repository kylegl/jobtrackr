import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createBidStatusInputShape = z.object({
  name: z.string(),
})
export type CreateBidStatusInput = z.infer<typeof createBidStatusInputShape>

export const updateBidStatusInputSchema = z.object({
  id: idSchema,
  name: z.string(),
})

export type UpdateBidStatusInput = z.infer<typeof updateBidStatusInputSchema>

export const GetByIdBidStatusInputShape = idInputSchema
export type GetByIdBidStatusInput = z.infer<typeof GetByIdBidStatusInputShape>

export const deleteBidStatusInputShape = idInputSchema
export type DeleteBidStatusInput = z.infer<typeof deleteBidStatusInputShape>

export const BidStatusListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const bidStatusRouter = router({
  add: publicProcedure
    .input(createBidStatusInputShape)
    .mutation(async ({ input }) => {
      const bidStatus = await prisma.bidStatus.create({
        data: input,
      })

      return bidStatus
    }),
  delete: publicProcedure
    .input(deleteBidStatusInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.bidStatus.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdBidStatusInputShape)
    .query(async ({ input }) => await prisma.bidStatus.findUnique({ where: input })),
  list: publicProcedure
    .input(BidStatusListInputSchema)
    .query(async ({ input }) => {
      const bidStatus = await prisma.bidStatus.findMany({ where: input })

      return bidStatus
    }),
  update: publicProcedure
    .input(updateBidStatusInputSchema)
    .mutation(async ({ input }) => {
      const { id, name } = input
      const bidStatus = await prisma.bidStatus.update({
        where: { id },
        data: {
          name,
        },
      })
      return bidStatus
    }),
})
