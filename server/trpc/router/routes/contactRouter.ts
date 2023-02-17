// import type { Prisma } from '@prisma/client'
// import type { ContactAddInput, IdInput } from '~~/server/trpc/schemas'
import {
  contactAddInputSchema,
  contactDeleteInputSchema,
  contactGetByIdInputSchema,
  contactListInputSchema,
  contactUpdateInputSchema,
} from '~~/server/trpc/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// TODO how should contacts be updated in regards to jobs, bids, wo's
// update the contact with the new job or update the job with new contacts
// i think this is the answer https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connectorcreate
// see also https://stackoverflow.com/questions/65950407/prisma-many-to-many-relations-create-and-connect

// #region (collapsed) Router Schemas

// #endregion

export const contactRouter = router({
  add: publicProcedure
    .input(contactAddInputSchema)
    .mutation(async ({ input }) => {
      const contact = await prisma.contact.create({
        data: input,
      })

      return contact
    }),
  delete: publicProcedure
    .input(contactDeleteInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.contact.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(contactGetByIdInputSchema)
    .query(async ({ input }) => await prisma.contact.findUnique({ where: input })),
  list: publicProcedure
    .input(contactListInputSchema)
    .query(async ({ input }) => {
      const contacts = await prisma.contact.findMany({ where: input })

      return contacts
    }),
  update: publicProcedure
    .input(contactUpdateInputSchema)
    .mutation(async ({ input }) => {
      const { id, name, email, phone, companyId, jobId } = input
      const contact = await prisma.contact.update({
        where: { id },
        data: {
          name,
          email,
          phone,
          companyId,
          jobs: {
            connect: {
              id: jobId,
            },
          },
        },
      })
      return contact
    }),
})

// export function connectOrCreateContact(input?: Array<CreateContactInput | IdInput>) {
//   if (!input)
//     return

//   return input.map((c) => {
//     let where: IdInput | { id: undefined } = { id: undefined }
//     let create: CreateContactInput

//     if ('id' in c)
//       where = { id: c.id }

//     if ('name' in c) {
//       create = {
//         name: c.name,
//         phone: c.phone,
//         email: c.email,
//         bidId: c.bidId,
//         jobId: c.jobId,
//         companyId: c.companyId,
//         workOrderId: c.workOrderId,
//       }
//     }
//     return {
//       where,
//       create,
//     }
//   })
// }
