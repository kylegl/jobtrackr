import { z } from 'zod'

export const getUserInputSchema = z.object({
  name: z.string().optional(),
})
export type GetUserInputSchema = z.infer<typeof getUserInputSchema>

export const createUserInputSchema = z.object({ username: z.string() })
export type CreateUserInputSchema = z.infer<typeof createUserInputSchema>

export const deleteUserInputSchema = z.string()
export type DeleteUserInputSchema = z.infer<typeof deleteUserInputSchema>
