import { PrismaClient } from '@prisma/client'
import { fetchCodeAllCodeProblems } from './utils/helpers'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
//   await prisma.code.create({
//     data: {
//       title: 'sum two numbers',
//       desc: 'Write a function that takes two numbers (a and b) as argument. Sum a and b with a constant variable. Return the result',
//       problem:
// `function myFunction(a, b) {
//   return
// }`,
//       solution:
// `function myFunction(a, b) {
//   const result = a + b;
//   return result
// }`,
//     }
//   })
  fetchCodeAllCodeProblems();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })