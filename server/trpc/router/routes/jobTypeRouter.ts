import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const jobTypeAddInputSchema = z.object({
  name: z.string(),
})
export type JobTypeAddInput = z.infer<typeof jobTypeAddInputSchema>

export const jobTypeUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string(),
})

export type JobTypeUpdateInput = z.infer<typeof jobTypeUpdateInputSchema>

export const jobTypeGetByIdInputSchema = idInputSchema
export type JobTypeGetByIdInput = z.infer<typeof jobTypeGetByIdInputSchema>

export const jobTypeDeleteInputSchema = idInputSchema
export type JobTypeDeleteInput = z.infer<typeof jobTypeDeleteInputSchema>

export const JobTypeListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})
export type JobTypeListInput = z.infer<typeof JobTypeListInputSchema>

// #endregion

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
    .input(JobTypeListInputSchema)
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
