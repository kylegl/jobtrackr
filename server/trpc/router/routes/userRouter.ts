import { z } from 'zod'
import { publicProcedure, router } from '~~/server/trpc/trpc'
import { prisma } from '~~/server/prisma/prisma'

const getUserInputSchema = z.object({
  name: z.string().optional(),
})
export type GetUserInputSchema = z.infer<typeof getUserInputSchema>

export const createUserInputSchema = z.object({ username: z.string() })
export type CreateUserInputSchema = z.infer<typeof createUserInputSchema>

export const deleteUserInputSchema = z.string()
export type DeleteUserInputSchema = z.infer<typeof deleteUserInputSchema>

export const userRouter = router({
  getById: publicProcedure
    .input(getUserInputSchema)
    .query(({ input }) => ({
      username: input?.name ?? 'anonymous',
      isUser: !!input?.name,
    })),
  add: publicProcedure
    .input(createUserInputSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
      })

      return user
    }),
  list: publicProcedure
    .query(async () => {
      const users = await prisma.user.findMany()
      return users
    }),
  delete: publicProcedure
    .input(deleteUserInputSchema)
    .mutation(async ({ input }) => {
      const res = await prisma.user.delete({ where: { username: input } })

      return res
    }),
  deleteMany: publicProcedure
    .mutation(async () => {
      const res = await prisma.user.deleteMany()

      return res
    }),
})
