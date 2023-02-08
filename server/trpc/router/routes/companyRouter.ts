import {
  companyAddInputSchema,
  companyGetByIdInputSchema,
  companyListInputSchema,
  companyUpdateInputSchema,
} from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

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
