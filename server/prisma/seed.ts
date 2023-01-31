import { PrismaClient } from '@prisma/client'
import { getSeeds } from './mockDataSchemas'

const prisma = new PrismaClient()

async function main() {
  const data = getSeeds()
  await asyncForEach(data, async (seed) => {
    const { model, action, prismaData } = seed
    const res = await asyncForEach(prismaData, async data => await prisma[model][action](data))
  })
}

main().then(async () => await prisma.$disconnect()).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++)
    await callback(array[index], index, array)
}

