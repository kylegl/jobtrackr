import { z } from 'zod'
import { idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const propertyAddInputSchema = z.object({
  address: z.string(),
  gateCode: z.string().optional(),
})
export type PropertyAddInput = z.infer<typeof propertyAddInputSchema>

export const updatePropertyInputSchema = z.object({
  id: idSchema,
  address: z.string().optional(),
  gateCode: z.string().optional(),
})
export type PropertyUpdateInput = z.infer<typeof updatePropertyInputSchema>

export const propertyGetByIdInputSchema = z.object({
  id: idSchema,
})
export type PropertyGetByIdInput = z.infer<typeof propertyGetByIdInputSchema>

export const propertyDeleteInputSchema = z.object({
  id: idSchema,
})
export type PropertyDeleteInput = z.infer<typeof propertyDeleteInputSchema>

export const PropertyListInputSchema = z.object({
  id: idSchema.optional(),
  address: z.string().optional(),
})
export type PropertyListInput = z.infer<typeof PropertyListInputSchema>

// #endregion

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
    .input(PropertyListInputSchema)
    .query(async ({ input }) => {
      const contacts = await prisma.property.findMany({ where: input })

      return contacts
    }),
  update: publicProcedure
    .input(updatePropertyInputSchema)
    .mutation(async ({ input }) => {
      const { id, address, gateCode } = input
      const property = await prisma.property.update({
        where: { id },
        data: { address, gateCode },
      })

      return property
    }),
})

