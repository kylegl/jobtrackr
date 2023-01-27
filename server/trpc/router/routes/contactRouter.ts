import { z } from 'zod'
// import type { contactWhereUniqueInput } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import type { IdInput } from '~~/server/schemas'
import { idInputSchema, idSchema } from '~~/server/schemas'
import { prisma } from '~~/server/prisma/prisma'
import { publicProcedure, router } from '~~/server/trpc/trpc'

// TODO how should contacts be updated in regards to jobs, bids, wo's
// update the contact with the new job or update the job with new contacts
// i think this is the answer https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connectorcreate
// see also https://stackoverflow.com/questions/65950407/prisma-many-to-many-relations-create-and-connect

// #region (collapsed) Router Schemas

export const createContactInputShape = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  companyId: idSchema.optional(),
  jobId: idSchema.optional(),
  bidId: idSchema.optional(),
  workOrderId: idSchema.optional(),
})
export type CreateContactInput = z.infer<typeof createContactInputShape>

export const updateContactInputSchema = z.object({
  id: idSchema,
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  companyId: idSchema.optional(),
  jobId: idSchema.optional(),
  bidId: idSchema.optional(),
  workOrderId: idSchema.optional(),
})

export type UpdateContactInput = z.infer<typeof updateContactInputSchema>

export const createOrAddContactInputSchema = createContactInputShape.or(idInputSchema)
export type CreateOrAddContactInput = z.infer<typeof createOrAddContactInputSchema>
export type CreateOrAddContactInputConditional<
  T extends CreateOrAddContactInput | IdInput,
> = T extends CreateContactInput ? CreateContactInput : IdInput

export const GetByIdContactInputShape = idInputSchema
export type GetByIdContactInput = z.infer<typeof GetByIdContactInputShape>

export const deleteContactInputShape = idInputSchema
export type DeleteContactInput = z.infer<typeof deleteContactInputShape>

export const ContactListInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().optional(),
})

// #endregion

export const contactRouter = router({
  add: publicProcedure
    .input(createContactInputShape)
    .mutation(async ({ input }) => {
      const contact = await prisma.contact.create({
        data: input,
      })

      return contact
    }),
  delete: publicProcedure
    .input(deleteContactInputShape)
    .mutation(async ({ input }) => {
      const { id } = input
      await prisma.contact.delete({ where: { id } })

      return id
    }),
  getById: publicProcedure
    .input(GetByIdContactInputShape)
    .query(async ({ input }) => await prisma.contact.findUnique({ where: input })),
  list: publicProcedure
    .input(ContactListInputSchema)
    .query(async ({ input }) => {
      const contacts = await prisma.contact.findMany({ where: input })

      return contacts
    }),
  update: publicProcedure
    .input(updateContactInputSchema)
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

export function connectOrCreateContact(input?: Array<CreateContactInput | IdInput>) {
  if (!input)
    return

  return input.map((c) => {
    let where: Prisma.contactWhereInput | undefined
    let create: CreateContactInput | undefined

    if ('id' in c)
      where = { id: c.id }

    if ('name' in c) {
      create = {
        name: c.name,
        phone: c.phone,
        email: c.email,
      }
    }

    return {
      where,
      create,
    }
  })
}
