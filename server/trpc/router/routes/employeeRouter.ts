import { z } from 'zod'
import { idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region(collapsed) Router Schemas

export const createEmployeeInputShape = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  positionId: idSchema.optional(),
  isEmployed: z.boolean(),
})
export type CreateEmployeeInput = z.infer<typeof createEmployeeInputShape>

export const updateEmployeeInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  positionId: idSchema.optional(),
  isEmployed: z.boolean().optional(),
})
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeInputSchema>

export const GetByIdEmployeeInputShape = z.object({
  id: idSchema,
})
export type GetByIdEmployeeInput = z.infer<typeof GetByIdEmployeeInputShape>

export const deleteEmployeeInputShape = z.object({
  id: idSchema,
})
export type DeleteEmployeeInput = z.infer<typeof deleteEmployeeInputShape>

export const employeeListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const employeeRouter = router({
  add: publicProcedure
    .input(createEmployeeInputShape)
    .mutation(async ({ input }) => {
      const employee = await prisma.employee.create({
        data: input,
      })

      return employee
    }),
  delete: publicProcedure
    .input(deleteEmployeeInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.employee.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdEmployeeInputShape)
    .query(async ({ input }) => await prisma.employee.findUnique({ where: input })),
  list: publicProcedure
    .input(employeeListInputSchema)
    .query(async ({ input }) => {
      const Employees = await prisma.employee.findMany({ where: input })

      return Employees
    }),
  update: publicProcedure
    .input(updateEmployeeInputSchema)
    .mutation(async ({ input }) => {
      const { id, name, email, phone, isEmployed, positionId } = input
      const employee = await prisma.employee.update({
        where: { id },
        data: { name, email, phone, isEmployed, positionId },
      })
      return employee
    }),
})

