import type { Prisma } from '@prisma/client'
import type { ContactAddInput, IdInput } from '~~/server/trpc/schemas'

export * from './contactRouter'
export * from './userRouter'
export * from './employeeRouter'
export * from './jobTitleRouter'
export * from './propertyRouter'
export * from './jobRouter'
export * from './bidRouter'
export * from './jobTypeRouter'
export * from './taskRouter'
export * from './workOrderRouter'
export * from './companyRouter'

export function connectOrCreateContact(input?: Array<ContactAddInput | IdInput>) {
  if (!input)
    return

  return input.map((c) => {
    let where: Prisma.contactWhereInput | undefined
    let create: ContactAddInput | undefined

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
