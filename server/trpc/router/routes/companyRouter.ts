import { z } from 'zod'
import { idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region(collapsed) Router Schemas

export const companyAddInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})
export type CompanyAddInput = z.infer<typeof companyAddInputSchema>

export const companyUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})
export type CompanyUpdateInput = z.infer<typeof companyUpdateInputSchema>

export const companyGetByIdInputSchema = z.object({
  id: idSchema,
})
export type CompanyGetByIdInput = z.infer<typeof companyGetByIdInputSchema>

export const companyDeleteInputSchema = z.object({
  id: idSchema,
})
export type CompanyDeleteInput = z.infer<typeof companyDeleteInputSchema>

export const companyListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})
export type CompanyListInput = z.infer<typeof companyListInputSchema>

// #endregion

export const companyRouter = router({
  add: publicProcedure
    .input(companyAddInputSchema)
    .mutation(async ({ input }) => {
      const company = await prisma.company.create({
        data: input,
      })

      return company
    }),
  delete: publicProcedure
    .input(companyDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.company.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(companyGetByIdInputSchema)
    .query(async ({ input }) => await prisma.company.findUnique({ where: input })),
  list: publicProcedure
    .input(companyListInputSchema)
    .query(async ({ input }) => {
      const companies = await prisma.company.findMany({ where: input })

      return companies
    }),
  update: publicProcedure
    .input(companyUpdateInputSchema)
    .mutation(async ({ input }) => {
      const { id, name, email, phone } = input
      const company = await prisma.company.update({
        where: { id },
        data: { name, email, phone },
      })
      return company
    }),
})

