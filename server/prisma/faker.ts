import { faker } from '@faker-js/faker'

export const fName = () => faker.company.name()
export const fPhone = () => faker.phone.number()
export const fEmail = () => faker.internet.email()
