import { z } from 'zod'
import type { CreateContactInput } from './contactRouter'
import { createOrAddContactInputSchema } from '~~/server/trpc/router/routes/contactRouter'
import type { IdInput } from '~~/server/schemas'
import { bidStatusSchema, datetimeSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// TODO how if contact array accepts two types. how to tell typescript its a certain type if an attribute is missing.
// for example a contact is new if there is no ID attribute and an update if it has a valid id.

// #region (collapsed) Router Schemas

export const createBidInputSchema = z.object({
  name: z.string(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  total: z.number().optional(),
  hours: z.number().optional(),
  sentAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  typeId: idSchema.optional(),
  status: bidStatusSchema,
  contacts: z.array(createOrAddContactInputSchema).optional(),
  companyId: idSchema.optional(),
  propertyId: idSchema.optional(),
})
export type CreateBidInput = z.infer<typeof createBidInputSchema>

export const updateBidInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  total: z.number().optional(),
  hours: z.number().optional(),
  sentAt: datetimeSchema.optional(),
  dueAt: datetimeSchema.optional(),
  closedAt: datetimeSchema.optional(),
  typeId: idSchema.optional(),
  status: bidStatusSchema.optional(),
  companyId: idSchema.optional(),
  propertyId: idSchema.optional(),
  contacts: z.array(createOrAddContactInputSchema).optional(),
  // TODO update when bid & work order router is in
  jobs: z.array(z.string()).optional(),
})
export type UpdateBidInput = z.infer<typeof updateBidInputSchema>

export const GetByIdBidInputSchema = z.object({
  id: idSchema,
})
export type GetByIdBidInput = z.infer<typeof GetByIdBidInputSchema>

export const deleteBidInputSchema = z.object({
  id: idSchema,
})
export type DeleteBidInput = z.infer<typeof deleteBidInputSchema>

export const BidListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
  companyId: idSchema.optional(),
})

// #endregion

export const bidRouter = router({
  add: publicProcedure
    .input(createBidInputSchema)
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
              let create: CreateContactInput | undefined
              if ('id' in c)
                where = { id: c.id }
              if ('name' in c) {
                create = {
                  name: c.name,
                  phone: c.phone,
                  email: c.email,
                } as CreateContactInput
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
    .input(deleteBidInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.bid.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdBidInputSchema)
    .query(async ({ input }) => await prisma.bid.findUnique({ where: input })),
  list: publicProcedure
    .input(BidListInputSchema)
    .query(async ({ input }) => {
      const bids = await prisma.bid.findMany({ where: input })

      return bids
    }),
  update: publicProcedure
    .input(updateBidInputSchema)
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

