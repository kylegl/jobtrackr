import {
  jobAddInputSchema,
  jobDeleteInputSchema,
  jobGetByIdInputSchema,
  jobListInputSchema,
  jobUpdateInputSchema,
} from '~~/server/trpc/schemas/job'
import type { ContactAddInput, IdInput } from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// TODO how if contact array accepts two types. how to tell typescript its a certain type if an attribute is missing.
// for example a contact is new if there is no ID attribute and an update if it has a valid id.

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
