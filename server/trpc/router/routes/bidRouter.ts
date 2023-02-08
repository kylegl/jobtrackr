import {
  bidAddInputSchema,
  bidDeleteInputSchema,
  bidGetByIdInputSchema,
  bidListInputSchema,
  bidUpdateInputSchema,
} from '~~/server/trpc/schemas'
import type { ContactAddInput, IdInput } from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// TODO how if contact array accepts two types. how to tell typescript its a certain type if an attribute is missing.
// for example a contact is new if there is no ID attribute and an update if it has a valid id.

export const bidRouter = router({
  add: publicProcedure
    .input(bidAddInputSchema)
    .mutation(async ({ input }) => {
      const {
        name,
        number,
        isPrevailingWage,
        isHourly,
        total,
        hours,
        sentAt,
        dueAt,
        closedAt,
        typeId,
        status,
        propertyId,
        contacts,
        // companies,
        // contacts,
        // jobs,
      } = input
      const bid = await prisma.bid.create({
        data: {
          name,
          number,
          isPrevailingWage,
          isHourly,
          total,
          hours,
          sentAt,
          dueAt,
          closedAt,
          typeId,
          status,
          propertyId,
          // companies,
          // contacts,
          // jobs,
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

      return bid
    }),
  delete: publicProcedure
    .input(bidDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.bid.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(bidGetByIdInputSchema)
    .query(async ({ input }) => await prisma.bid.findUnique({ where: input })),
  list: publicProcedure
    .input(bidListInputSchema)
    .query(async ({ input }) => {
      const bids = await prisma.bid.findMany({ where: input })

      return bids
    }),
  update: publicProcedure
    .input(bidUpdateInputSchema)
    .mutation(async ({ input }) => {
      const {
        id,
        name,
        number,
        isPrevailingWage,
        isHourly,
        total,
        hours,
        sentAt,
        dueAt,
        closedAt,
        typeId,
        status,
        propertyId,
        // companies,
        // contacts,
        // jobs,
      } = input
      const bid = await prisma.bid.update({
        where: { id },
        data: {
          name,
          number,
          isPrevailingWage,
          isHourly,
          total,
          hours,
          sentAt,
          dueAt,
          closedAt,
          typeId,
          status,
          propertyId,
        },
      })
      return bid
    }),
})
