import { z } from 'zod'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// #region (collapsed) Router Schemas

export const createJobTitleInputSchema = z.object({
  title: z.string(),
})
export type CreateJobTitleInput = z.infer<typeof createJobTitleInputSchema>

export const updateJobTitleInputSchema = z.object({
  id: idSchema,
  title: z.string(),
})

export type UpdateJobTitleInput = z.infer<typeof updateJobTitleInputSchema>

export const GetByIdJobTitleInputSchema = idInputSchema
export type GetByIdJobTitleInput = z.infer<typeof GetByIdJobTitleInputSchema>

export const deleteJobTitleInputSchema = idInputSchema
export type DeleteJobTitleInput = z.infer<typeof deleteJobTitleInputSchema>

export const JobTitleListInputSchema = z.object({
  id: idSchema.optional(),
  title: z.string().optional(),
})

// #endregion

export const jobTitleRouter = router({
  add: publicProcedure
    .input(createJobTitleInputSchema)
    .mutation(async ({ input }) => {
      const jobTitle = await prisma.jobTitle.create({
        data: input,
      })

      return jobTitle
    }),
  delete: publicProcedure
    .input(deleteJobTitleInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.jobTitle.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdJobTitleInputSchema)
    .query(async ({ input }) => await prisma.jobTitle.findUnique({ where: input })),
  list: publicProcedure
    .input(JobTitleListInputSchema)
    .query(async ({ input }) => {
      const jobTitle = await prisma.jobTitle.findMany({ where: input })

      return jobTitle
    }),
  update: publicProcedure
    .input(updateJobTitleInputSchema)
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
