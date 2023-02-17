import {
  jobTypeAddInputSchema,
  jobTypeDeleteInputSchema,
  jobTypeGetByIdInputSchema,
  jobTypeListInputSchema,
  jobTypeUpdateInputSchema,
} from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

export const jobTypeRouter = router({
  add: publicProcedure
    .input(jobTypeAddInputSchema)
    .mutation(async ({ input }) => {
      const jobType = await prisma.jobType.create({
        data: input,
      })

      return jobType
    }),
  delete: publicProcedure
    .input(jobTypeDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.jobType.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(jobTypeGetByIdInputSchema)
    .query(async ({ input }) => await prisma.jobType.findUnique({ where: input })),
  list: publicProcedure
    .input(jobTypeListInputSchema)
    .query(async ({ input }) => {
      const jobType = await prisma.jobType.findMany({ where: input })

      return jobType
    }),
  update: publicProcedure
    .input(jobTypeUpdateInputSchema)
    .mutation(async ({ input }) => {
      const { id, name } = input
      const jobType = await prisma.jobType.update({
        where: { id },
        data: {
          name,
        },
      })
      return jobType
    }),
})
