import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createJobTypeInputShape = z.object({
  name: z.string(),
})
export type CreateJobTypeInput = z.infer<typeof createJobTypeInputShape>

export const updateJobTypeInputSchema = z.object({
  id: idSchema,
  name: z.string(),
})

export type UpdateJobTypeInput = z.infer<typeof updateJobTypeInputSchema>

export const GetByIdJobTypeInputShape = idInputSchema
export type GetByIdJobTypeInput = z.infer<typeof GetByIdJobTypeInputShape>

export const deleteJobTypeInputShape = idInputSchema
export type DeleteJobTypeInput = z.infer<typeof deleteJobTypeInputShape>

export const JobTypeListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const jobTypeRouter = router({
  add: publicProcedure
    .input(createJobTypeInputShape)
    .mutation(async ({ input }) => {
      const jobType = await prisma.jobType.create({
        data: input,
      })

      return jobType
    }),
  delete: publicProcedure
    .input(deleteJobTypeInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.jobType.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdJobTypeInputShape)
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
