import type { GenerateMockOptions } from '@anatine/zod-mock'
import { generateMock } from '@anatine/zod-mock'
import { faker } from '@faker-js/faker'
import type { ZodTypeAny } from 'zod'
import { z } from 'zod'
import { fPhone } from './faker'

// #region schemas

const defaultStringMap = {
  phone: () => fPhone(),
  startAt: () => faker.date.soon(parseInt(faker.random.numeric())),
  dueAt: () => faker.date.soon(parseInt(faker.random.numeric(2))),
  closedAt: () => faker.date.soon(parseInt(faker.random.numeric(3))),
}

const mockJobTitles = ['Manager', 'Supervisor', 'Painter']

function generateJobTitles() {
  return mockJobTitles.map(title => ({ title }))
}

const mockEmployeeInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  title: z.string().optional(),
  titleId: z.string().cuid().optional(),
  isEmployed: z.boolean(),
})

function generateEmployee() {
  return generateMock(mockEmployeeInputSchema, { stringMap: defaultStringMap })
}

const mockContactInputSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})

const mockContactOptions = {
  stringMap: defaultStringMap,
}

const mockContact = {
  schema: mockContactInputSchema,
  options: mockContactOptions,
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

// #endregion

const seedMockDataSchema: MockDataSchema[] = [
  {
    model: 'company',
    pk: 'name',
    num: 3,
    mock: mockCompany,
    subMocks: [
      {
        key: 'contacts',
        data:
          {
            model: 'contact',
            mock: mockContact,
            num: 3,
          },
      },
    ],
  },
  // {
  //   model: 'jobTitle',
  //   pk: 'title',
  //   generator: generateJobTitles,
  // },
]

// utils
export function getSeeds(mockSchema = seedMockDataSchema) {
  const upsertData = mockSchema.map((mock) => {
    const data = generateMockData(mock)
    const upserts = data.map(item => generateUpsert(mock.pk, item))
    return { model: mock.model, upserts }
  })

  return upsertData
}

function generateUpsert(pk: string, data) {
  return {
    where: { [pk]: data[pk] },
    update: {},
    create: data,
  }
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

