import {
  employeeAddInputSchema,
  employeeDeleteInputSchema,
  employeeGetByIdInputSchema,
  employeeListInputSchema,
  employeeUpdateInputSchema,
} from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

export const employeeRouter = router({
  add: publicProcedure
    .input(employeeAddInputSchema)
    .mutation(async ({ input }) => {
      const { name, phone, email, isEmployed, title } = input
      const employee = await prisma.employee.create({
        data: {
          name,
          phone,
          email,
          isEmployed,
          title: {
            connect: {
              title,
            },
          },
        },
      })

      return employee
    }),
  delete: publicProcedure
    .input(employeeDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.employee.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(employeeGetByIdInputSchema)
    .query(async ({ input }) => await prisma.employee.findUnique({ where: input })),
  list: publicProcedure
    .input(employeeListInputSchema)
    .query(async ({ input }) => {
      const employees = await prisma.employee.findMany({ where: input })

      return employees
    }),
  update: publicProcedure
    .input(employeeUpdateInputSchema)
    .mutation(async ({ input }) => {
      const { id, name, email, phone, isEmployed, titleId } = input
      const employee = await prisma.employee.update({
        where: { id },
        data: { name, email, phone, isEmployed, titleId },
      })
      return employee
    }),
})
