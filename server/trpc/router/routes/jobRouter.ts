import { z } from 'zod'
import type { ContactAddInput } from '~~/server/trpc/router/routes/contactRouter'
import { createOrAddContactInputSchema } from '~~/server/trpc/router/routes/contactRouter'
import type { IdInput } from '~~/server/schemas'
import { datetimeSchema, idSchema, jobStatusOptionsSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// TODO how if contact array accepts two types. how to tell typescript its a certain type if an attribute is missing.
// for example a contact is new if there is no ID attribute and an update if it has a valid id.

// #region (collapsed) Router Schemas

export const jobAddInputSchema = z.object({
  name: z.string(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  contractTotal: z.number().optional(),
  invoicedTotal: z.number().optional(),
  paidTotal: z.number().optional(),
  hours: z.number().optional(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  notes: z.string().optional(),
  typeId: idSchema.optional(),
  status: jobStatusOptionsSchema,
  contacts: z.array(createOrAddContactInputSchema).optional(),
  companyId: idSchema.optional(),
  propertyId: idSchema.optional(),
  // TODO update when bid & work order router is in
  bids: z.array(z.string()).optional(),
  workOrders: z.array(z.string()).optional(),
})
export type JobAddInput = z.infer<typeof jobAddInputSchema>

export const jobUpdateInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  contractTotal: z.number().optional(),
  invoicedTotal: z.number().optional(),
  paidTotal: z.number().optional(),
  hours: z.number().optional(),
  startAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  notes: z.string().optional(),
  typeId: idSchema.optional(),
  status: jobStatusOptionsSchema.optional(),
  companyId: idSchema.optional(),
  propertyId: idSchema.optional(),
  contacts: z.array(createOrAddContactInputSchema).optional(),
  // TODO update when bid & work order router is in
  bids: z.array(z.string()).optional(),
  workOrders: z.array(z.string()).optional(),
})
export type JobUpdateInput = z.infer<typeof jobUpdateInputSchema>

export const jobGetByIdInputSchema = z.object({
  id: idSchema,
})
export type JobGetByIdInput = z.infer<typeof jobGetByIdInputSchema>

export const jobDeleteInputSchema = z.object({
  id: idSchema,
})
export type JobDeleteInput = z.infer<typeof jobDeleteInputSchema>

export const jobListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
  companyId: idSchema.optional(),
})
export type JobListInput = z.infer<typeof jobListInputSchema>

// #endregion

export const jobRouter = router({
  add: publicProcedure
    .input(jobAddInputSchema)
    .mutation(async ({ input }) => {
      const {
        name,
        number,
        isPrevailingWage,
        isHourly,
        contractTotal,
        invoicedTotal,
        paidTotal,
        hours,
        startAt,
        dueAt,
        closedAt,
        notes,
        typeId,
        status,
        companyId,
        propertyId,
        contacts,
        // bids,
        // workOrders,
      } = input
      const job = await prisma.job.create({
        data: {
          name,
          number,
          isPrevailingWage,
          isHourly,
          contractTotal,
          invoicedTotal,
          paidTotal,
          hours,
          startAt,
          dueAt,
          closedAt,
          notes,
          typeId,
          status,
          companyId,
          propertyId,
          contacts: {
            connectOrCreate: contacts?.map((c) => {
              let where: IdInput | { id: undefined } = { id: undefined }
              let create: ContactAddInput | undefined
              if ('id' in c)
                where = { id: c.id }
              if ('name' in c) {
                create = {
                  name: c.name,
                  phone: c.phone,
                  email: c.email,
                } as ContactAddInput
              }
              return {
                where,
                create,
              }
            }),
          },
        },
      })

      return job
    }),
  delete: publicProcedure
    .input(jobDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.job.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(jobGetByIdInputSchema)
    .query(async ({ input }) => await prisma.job.findUnique({ where: input })),
  list: publicProcedure
    .input(jobListInputSchema)
    .query(async ({ input }) => {
      const jobs = await prisma.job.findMany({ where: input })

      return jobs
    }),
  update: publicProcedure
    .input(jobUpdateInputSchema)
    .mutation(async ({ input }) => {
      const {
        id,
        name,
        number,
        isPrevailingWage,
        isHourly,
        contractTotal,
        invoicedTotal,
        paidTotal,
        hours,
        startAt,
        dueAt,
        closedAt,
        notes,
        typeId,
        status,
        companyId,
        propertyId,
      } = input
      const job = await prisma.job.update({
        where: { id },
        data: {
          name,
          number,
          isPrevailingWage,
          isHourly,
          contractTotal,
          invoicedTotal,
          paidTotal,
          hours,
          startAt,
          dueAt,
          closedAt,
          notes,
          typeId,
          status,
          companyId,
          propertyId,
        },
      })
      return job
    }),
})

