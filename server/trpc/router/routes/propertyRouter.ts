import {
  propertyAddInputSchema,
  propertyDeleteInputSchema,
  propertyGetByIdInputSchema,
  propertyListInputSchema,
  propertyUpdateInputSchema,
} from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

export const propertyRouter = router({
  add: publicProcedure
    .input(propertyAddInputSchema)
    .mutation(async ({ input }) => {
      const property = await prisma.property.create({
        data: input,
      })

      return property
    }),
  delete: publicProcedure
    .input(propertyDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.property.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(propertyGetByIdInputSchema)
    .query(async ({ input }) => await prisma.property.findUnique({ where: input })),
  list: publicProcedure
    .input(propertyListInputSchema)
    .query(async ({ input }) => {
      const contacts = await prisma.property.findMany({ where: input })

      return contacts
    }),
  update: publicProcedure
    .input(propertyUpdateInputSchema)
    .mutation(async ({ input }) => {
      const { id, address, gateCode } = input
      const property = await prisma.property.update({
        where: { id },
        data: { address, gateCode },
      })

      return property
    }),
})
