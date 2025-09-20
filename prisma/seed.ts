import { PrismaClient } from '@prisma/client'
import {faker} from "@faker-js/faker"

const prisma = new PrismaClient()

async function main() {

  // generate jake date for user
  // await prisma.user.createMany({
  //   data: Array.from({length:25}, () => ({
  //      email: faker.internet.email(),
  //       name: faker.internet.username(),
  //       address: {
  //           street: faker.location.street(),
  //           city: faker.location.city(),
  //           state: faker.location.state(),
  //           zip: faker.location.zipCode()
  //       }
  //   }))
  // })

  // generate jake date for todo
//   await

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
}