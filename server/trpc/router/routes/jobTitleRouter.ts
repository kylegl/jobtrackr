import {
  JobTitleListInputSchema,
  jobTitleAddInputSchema,
  jobTitleDeleteInputSchema,
  jobTitleGetByIdInputSchema,
  jobTitleUpdateInputSchema,
} from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

export const jobTitleRouter = router({
  add: publicProcedure
    .input(jobTitleAddInputSchema)
    .mutation(async ({ input }) => {
      const jobTitle = await prisma.jobTitle.create({
        data: input,
      })

      return jobTitle
    }),
  delete: publicProcedure
    .input(jobTitleDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.jobTitle.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(jobTitleGetByIdInputSchema)
    .query(async ({ input }) => await prisma.jobTitle.findUnique({ where: input })),
  list: publicProcedure
    .input(JobTitleListInputSchema)
    .query(async ({ input }) => {
      const jobTitle = await prisma.jobTitle.findMany({ where: input })

      return jobTitle
    }),
  update: publicProcedure
    .input(jobTitleUpdateInputSchema)
    .mutation(async ({ input }) => {
      const { id, title } = input
      const jobTitle = await prisma.jobTitle.update({
        where: { id },
        data: {
          title,
        },
      })
      return jobTitle
    }),
})
