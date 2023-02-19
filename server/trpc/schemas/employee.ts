import { z } from 'zod'
import {
  emailOptionalInputSchema,
  idSchema,
  nameInputRequiredSchema,
  phoneInputSchema,
} from '~~/server/trpc/schemas'

export const employeeAddInputSchema = z.object({
  name: nameInputRequiredSchema,
  phone: phoneInputSchema,
  email: emailOptionalInputSchema,
  title: z.string().optional(),
  titleId: idSchema.optional(),
  isEmployed: z.boolean(),
})
export type EmployeeAddInput = z.infer<typeof employeeAddInputSchema>

export const employeeUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  phone: phoneInputSchema,
  email: emailOptionalInputSchema,
  title: z.string().optional(),
  titleId: idSchema.optional(),
  isEmployed: z.boolean().optional(),
})
export type EmployeeUpdateInput = z.infer<typeof employeeUpdateInputSchema>

export const employeeGetByIdInputSchema = z.object({
  id: idSchema,
})
export type EmployeeGetByIdInput = z.infer<typeof employeeGetByIdInputSchema>

export const employeeDeleteInputSchema = z.object({
  id: idSchema,
})
export type EmployeeDeleteInput = z.infer<typeof employeeDeleteInputSchema>

export const employeeListInputSchema = z.object({
  titleId: idSchema.optional(),
  isEmployed: z.boolean().optional(),
}).optional()
export type EmployeeListInput = z.infer<typeof employeeListInputSchema>
