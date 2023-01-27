import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createJobStatusInputShape = z.object({
  name: z.string(),
})
export type CreateJobStatusInput = z.infer<typeof createJobStatusInputShape>

export const updateJobStatusInputSchema = z.object({
  id: idSchema,
  name: z.string(),
})

export type UpdateJobStatusInput = z.infer<typeof updateJobStatusInputSchema>

export const GetByIdJobStatusInputShape = idInputSchema
export type GetByIdJobStatusInput = z.infer<typeof GetByIdJobStatusInputShape>

export const deleteJobStatusInputShape = idInputSchema
export type DeleteJobStatusInput = z.infer<typeof deleteJobStatusInputShape>

export const JobStatusListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const jobStatusRouter = router({
  add: publicProcedure
    .input(createJobStatusInputShape)
    .mutation(async ({ input }) => {
      const jobStatus = await prisma.jobStatus.create({
        data: input,
      })

      return jobStatus
    }),
  delete: publicProcedure
    .input(deleteJobStatusInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.jobStatus.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdJobStatusInputShape)
    .query(async ({ input }) => await prisma.jobStatus.findUnique({ where: input })),
  list: publicProcedure
    .input(JobStatusListInputSchema)
    .query(async ({ input }) => {
      const jobStatus = await prisma.jobStatus.findMany({ where: input })

      return jobStatus
    }),
  update: publicProcedure
    .input(updateJobStatusInputSchema)
    .mutation(async ({ input }) => {
      const { id, name } = input
      const jobStatus = await prisma.jobStatus.update({
        where: { id },
        data: {
          name,
        },
      })
      return jobStatus
    }),
})
