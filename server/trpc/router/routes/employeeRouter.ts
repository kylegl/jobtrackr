import { title } from 'process'
import { z } from 'zod'
import { idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region(collapsed) Router Schemas

export const employeeAddInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  title: z.string().optional(),
  titleId: idSchema.optional(),
  isEmployed: z.boolean(),
})
export type EmployeeAddInput = z.infer<typeof employeeAddInputSchema>

export const updateEmployeeInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  title: z.string().optional(),
  titleId: idSchema.optional(),
  isEmployed: z.boolean().optional(),
})
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeInputSchema>

export const EmployeeGetByIdInputSchema = z.object({
  id: idSchema,
})
export type EmployeeGetByIdInput = z.infer<typeof EmployeeGetByIdInputSchema>

export const deleteEmployeeInputSchema = z.object({
  id: idSchema,
})
export type DeleteEmployeeInput = z.infer<typeof deleteEmployeeInputSchema>

export const employeeListInputSchema = z.object({
  titleId: idSchema.optional(),
  isEmployed: z.boolean().optional(),
  name: z.string().optional(),
}).optional()
export type EmployeeListInput = z.infer<typeof employeeListInputSchema>
// #endregion

export const employeeRouter = router({
  add: publicProcedure
    .input(employeeAddInputSchema)
    .mutation(async ({ input }) => {
      const { name, phone, email, isEmployed } = input
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
    .input(deleteEmployeeInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.employee.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(EmployeeGetByIdInputSchema)
    .query(async ({ input }) => await prisma.employee.findUnique({ where: input })),
  list: publicProcedure
    .input(employeeListInputSchema)
    .query(async ({ input }) => {
      const employees = await prisma.employee.findMany({ where: input })

      return employees
    }),
  update: publicProcedure
    .input(updateEmployeeInputSchema)
    .mutation(async ({ input }) => {
      const { id, name, email, phone, isEmployed, titleId } = input
      const employee = await prisma.employee.update({
        where: { id },
        data: { name, email, phone, isEmployed, titleId },
      })
      return employee
    }),
})

