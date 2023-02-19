/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GenerateMockOptions } from '@anatine/zod-mock'
import { generateMock } from '@anatine/zod-mock'
import { faker } from '@faker-js/faker'
import type { ZodTypeAny } from 'zod'
import { z } from 'zod'
import { fPhone } from './faker'

// TODO heres what im thinking. fuck prisma upsert. use prisma create, return ids needed
// to link them to whatever you need to. currently upsert doesn't work for one to many relations

// #region schemas

const defaultStringMap = {
  phone: () => fPhone(),
  sentAt: () => faker.date.soon(parseInt(faker.random.numeric())),
  startAt: () => faker.date.soon(parseInt(faker.random.numeric())),
  dueAt: () => faker.date.soon(parseInt(faker.random.numeric(2))),
  closedAt: () => faker.helpers.maybe(() => faker.date.soon(parseInt(faker.random.numeric(3))), { probability: 0.1 }),
  total: () => parseInt(faker.random.numeric(5)),
  hours: () => parseInt(faker.random.numeric(3)),
  typeId: () => faker.helpers.arrayElement(['clecc75j5000634rv8umrwtjb', 'clecc8atx000c34rvqsswczea']),
  companyId: () => faker.helpers.arrayElement(['cleccevee00003481f8y8spa7', 'cleccevmo000e34814t4hcnr3', 'cleccevsp000s34814fhbd6rf']),
  propertyId: () => faker.helpers.arrayElement(['cleccfqnb00163481pf6sfsfr', 'cleccfqr200183481kaiujbcx', 'cleccfqth001a3481bl47tl5n', 'cleccfqyg001e3481wy5bckkm', 'cleccfr0x001g34813n4puiu7', 'cleccfr3e001i34817s027uar', 'cleccfr5s001k3481teoizu0h']),
  notes: () => faker.lorem.sentences(),
}

const mockJobTitle: MockSchema = {
  schema: z.object({
    title: z.enum(['Manager', 'Supervisor', 'Painter']),
  }),
  options: {
    stringMap: {
      title: () => faker.helpers.unique(['Manager', 'Supervisor', 'Painter']),
    },
  },
}

const mockJobType: MockSchema = {
  schema: z.object({
    name: z.enum(['Painting', 'Finishing']),
  }),
  options: {
    stringMap: {
      name: () => faker.helpers.arrayElement(['Painting', 'Finishing']),
    },
  },
}

const mockEmployeeOptions = {
  stringMap: {
    title: () => faker.helpers.arrayElement(['Painter', 'Manager', 'Supervisor']),
    ...defaultStringMap,
  },
}

const mockEmployeeInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  title: z.string(),
  isEmployed: z.boolean(),
})

const mockEmployee: MockSchema = {
  schema: mockEmployeeInputSchema,
  options: mockEmployeeOptions,
}

const mockContactInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})

const mockContact: MockSchema = {
  schema: mockContactInputSchema,
  options: {
    stringMap: defaultStringMap,
  },
}

const mockCompanyInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  // contacts: z.object({
  //   create: z.array(mockContactInputSchema),
  // }),
})

const mockCompanyOptions: MockOptions = {
  stringMap: {
    name: () => faker.company.name(),
    ...defaultStringMap,
  },
}

const mockCompany = {
  schema: mockCompanyInputSchema,
  options: mockCompanyOptions,
}

const mockPropertySchema = z.object({
  address: z.string(),
  gateCode: z.string().optional(),
})

const mockPropertyOptions: MockOptions = {
  stringMap: {
    address: () => faker.address.streetAddress(),
    gateCode: () => faker.random.numeric(3),
  },
}

const mockProperty: MockSchema = {
  schema: mockPropertySchema,
  options: mockPropertyOptions,
}

// const mockJobInputSchema =

// #endregion

const mockBidOptions = {
  stringMap: {
    name: () => faker.name.lastName(),
    number: () => `B-23-${faker.random.numeric(3)}`,
    ...defaultStringMap,
    ...defaultStringMap,
  },
}

const mockBidSchema = z.object({
  name: z.string(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  total: z.number().optional(),
  hours: z.number().optional(),
  sentAt: z.string().optional(),
  dueAt: z.string().optional(),
  closedAt: z.string().optional(),
  typeId: z.string().optional(),
  status: z.enum(['notStarted', 'started', 'review', 'completed', 'cancelled', 'hold']),
  propertyId: z.string().optional(),
})

const mockBid = {
  schema: mockBidSchema,
  options: mockBidOptions,
}

const mockJobOptions: MockOptions = {
  stringMap: {
    name: () => faker.helpers.unique(faker.name.lastName),
    number: () => `2023${faker.random.numeric(3)}`,
    contractTotal: () => parseInt(faker.random.numeric(5)),
    invoicedTotal: () => parseInt(faker.random.numeric(3)),
    paidTotal: () => parseInt(faker.random.numeric(2)),
    ...defaultStringMap,
  },
}

const mockJobSchema = z.object({
  name: z.string(),
  number: z.number().optional(),
  isPrevailingWage: z.boolean(),
  isHourly: z.boolean(),
  contractTotal: z.number().optional(),
  invoicedTotal: z.number().optional(),
  paidTotal: z.number().optional(),
  startAt: z.string(),
  dueAt: z.string(),
  closedAt: z.string().optional(),
  hours: z.number().optional(),
  notes: z.string().optional(),
  typeId: z.string(),
  status: z.enum(['notStarted', 'started', 'completed', 'cancelled', 'hold']),
  companyId: z.string().optional(),
  propertyId: z.string().optional(),
})

const mockJob: MockSchema = {
  schema: mockJobSchema,
  options: mockJobOptions,
}

const seedMockDataSchema: MockDataSchema[] = [
  // {
  //   model: 'jobTitle',
  //   action: 'create',
  //   pk: 'title',
  //   mock: mockJobTitle,
  //   num: 3,
  // },
  // {
  //   model: 'jobType',
  //   action: 'create',
  //   pk: 'id',
  //   mock: mockJobType,
  //   num: 2,
  // },
  // {
  //   model: 'company',
  //   pk: 'name',
  //   num: 3,
  //   action: 'upsert',
  //   mock: mockCompany,
  //   subMocks: [
  //     {
  //       key: 'contacts',
  //       data:
  //         {
  //           model: 'contact',
  //           pk: 'name',
  //           mock: mockContact,
  //           num: 3,
  //         },
  //     },
  //   ],
  // },
  // {
  //   model: 'property',
  //   action: 'create',
  //   pk: 'id',
  //   mock: mockProperty,
  //   num: 10,
  // },
  // {
  //   model: 'employee',
  //   action: 'create',
  //   pk: 'id',
  //   mock: mockEmployee,
  //   num: 20,
  // },
  // {
  //   model: 'bid',
  //   action: 'create',
  //   pk: 'id',
  //   mock: mockBid,
  //   num: 5,
  // },
  // {
  //   model: 'job',
  //   action: 'create',
  //   pk: 'id',
  //   mock: mockJob,
  //   num: 10,
  // },
]

// utils
export function getSeeds(mockSchema = seedMockDataSchema) {
  const mocks = mockSchema.map((mock) => {
    const data = generateMockData(mock)
    let prismaData
    if (mock.action === 'upsert')

      prismaData = data.map(item => generateUpsert(mock.pk, item))

    if (mock.action === 'create')
      prismaData = data.map(item => generateCreate(item))

    return { model: mock.model, action: mock.action, prismaData }
  })
  console.log('mocks', mocks)
  return mocks
}

function generateUpsert(pk: string, data) {
  return {
    where: { [pk]: data[pk] || '' },
    update: {},
    create: data,
  }
}

function generateCreate(data) {
  return { data }
}

function _generateMock<
  T extends ZodTypeAny | undefined>(zodSchema?: T,
  options?: MockOptions): z.infer<typeof zodSchema> | undefined {
  if (!zodSchema)
    return
  return generateMock(zodSchema, { stringMap: options?.stringMap })
}

function generateMockData(item: MockDataSchema) {
  const {
    mock,
    generator = _generateMock,
    subMocks,
  } = item
  let { num = 1 } = item

  const stuff = []

  while (num > 0) {
    const data = generator(mock?.schema, mock?.options)

    if (subMocks?.length) {
      subMocks.forEach((subMock) => {
        const subItems = generateMockData(subMock.data)

        data[subMock.key] = { create: subItems }
      })
    }

    num -= 1
    stuff.push(data)
  }

  return stuff
}

// types

interface MockDataSchema {
  model: string
  action?: string
  mock?: {
    schema?: ZodTypeAny
    options?: MockOptions
  }
  generator?: () => any
  num?: number
  pk: string
  subMocks?: Array<SubMock>
}

interface SubMock {
  key: string
  data: MockDataSchema
}

interface MockOptions extends GenerateMockOptions {
  subSchemas?: MockDataSchema[]
}

interface MockSchema {
  schema: ZodTypeAny
  options: MockOptions
}

