import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createJobTypeInputSchema = z.object({
  name: z.string(),
})
export type CreateJobTypeInput = z.infer<typeof createJobTypeInputSchema>

export const updateJobTypeInputSchema = z.object({
  id: idSchema,
  name: z.string(),
})

export type UpdateJobTypeInput = z.infer<typeof updateJobTypeInputSchema>

export const GetByIdJobTypeInputSchema = idInputSchema
export type GetByIdJobTypeInput = z.infer<typeof GetByIdJobTypeInputSchema>

export const deleteJobTypeInputSchema = idInputSchema
export type DeleteJobTypeInput = z.infer<typeof deleteJobTypeInputSchema>

export const JobTypeListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const jobTypeRouter = router({
  add: publicProcedure
    .input(createJobTypeInputSchema)
    .mutation(async ({ input }) => {
      const jobType = await prisma.jobType.create({
        data: input,
      })

      return jobType
    }),
  delete: publicProcedure
    .input(deleteJobTypeInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.jobType.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdJobTypeInputSchema)
    .query(async ({ input }) => await prisma.jobType.findUnique({ where: input })),
  list: publicProcedure
    .input(JobTypeListInputSchema)
    .query(async ({ input }) => {
      const jobType = await prisma.jobType.findMany({ where: input })

      return jobType
    }),
  update: publicProcedure
    .input(updateJobTypeInputSchema)
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
