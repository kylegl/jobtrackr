import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const jobTitleAddInputSchema = z.object({
  title: z.string(),
})
export type JobTitleAddInput = z.infer<typeof jobTitleAddInputSchema>

export const jobTitleUpdateInputSchema = z.object({
  id: idSchema,
  title: z.string(),
})

export type JobTitleUpdateInput = z.infer<typeof jobTitleUpdateInputSchema>

export const jobTitleGetByIdInputSchema = idInputSchema
export type JobTitleGetByIdInput = z.infer<typeof jobTitleGetByIdInputSchema>

export const jobTitleDeleteInputSchema = idInputSchema
export type JobTitleDeleteInput = z.infer<typeof jobTitleDeleteInputSchema>

export const JobTitleListInputSchema = z.object({
  id: idSchema.optional(),
  title: z.string().optional(),
})
export type JobTitleListInput = z.infer<typeof JobTitleListInputSchema>

// #endregion

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
