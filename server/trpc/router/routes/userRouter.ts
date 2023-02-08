import { publicProcedure, router } from '~~/server/trpc/trpc'
import { prisma } from '~~/server/prisma/prisma'
import { createUserInputSchema, deleteUserInputSchema, getUserInputSchema } from '~~/server/trpc/schemas'

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
