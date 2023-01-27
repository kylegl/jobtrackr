import { z } from 'zod'
import { idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region(collapsed) Router Schemas

export const createCompanyInputShape = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})
export type CreateCompanyInput = z.infer<typeof createCompanyInputShape>

export const updateCompanyInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})
export type UpdateCompanyInput = z.infer<typeof updateCompanyInputSchema>

export const GetByIdCompanyInputShape = z.object({
  id: idSchema,
})
export type GetByIdCompanyInput = z.infer<typeof GetByIdCompanyInputShape>

export const deleteCompanyInputShape = z.object({
  id: idSchema,
})
export type DeleteCompanyInput = z.infer<typeof deleteCompanyInputShape>

export const companyListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const companyRouter = router({
  add: publicProcedure
    .input(createCompanyInputShape)
    .mutation(async ({ input }) => {
      const company = await prisma.company.create({
        data: input,
      })

      return company
    }),
  delete: publicProcedure
    .input(deleteCompanyInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.company.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdCompanyInputShape)
    .query(async ({ input }) => await prisma.company.findUnique({ where: input })),
  list: publicProcedure
    .input(companyListInputSchema)
    .query(async ({ input }) => {
      const companies = await prisma.company.findMany({ where: input })

      return companies
    }),
  update: publicProcedure
    .input(updateCompanyInputSchema)
    .mutation(async ({ input }) => {
      const { id, name, email, phone } = input
      const company = await prisma.company.update({
        where: { id },
        data: { name, email, phone },
      })
      return company
    }),
})

