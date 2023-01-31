import { z } from 'zod'
import { idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createPropertyInputSchema = z.object({
  address: z.string(),
  gateCode: z.string().optional(),
})
export type CreatePropertyInput = z.infer<typeof createPropertyInputSchema>

export const updatePropertyInputSchema = z.object({
  id: idSchema,
  address: z.string().optional(),
  gateCode: z.string().optional(),
})
export type UpdatePropertyInput = z.infer<typeof updatePropertyInputSchema>

export const GetByIdPropertyInputSchema = z.object({
  id: idSchema,
})
export type GetByIdPropertyInput = z.infer<typeof GetByIdPropertyInputSchema>

export const deletePropertyInputSchema = z.object({
  id: idSchema,
})
export type DeletePropertyInput = z.infer<typeof deletePropertyInputSchema>

export const PropertyListInputSchema = z.object({
  id: idSchema.optional(),
  address: z.string().optional(),
})

// #endregion

export const propertyRouter = router({
  add: publicProcedure
    .input(createPropertyInputSchema)
    .mutation(async ({ input }) => {
      const property = await prisma.property.create({
        data: input,
      })

      return property
    }),
  delete: publicProcedure
    .input(deletePropertyInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.property.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdPropertyInputSchema)
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

