/**
 * Seed database with mock data using faker npm library
 * Run with
 */
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const employeeData = Array.from({ length: 50 }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    position: faker.person.jobTitle(),
    salary: parseFloat(faker.finance.amount(30000, 150000, 2)),
    department: faker.commerce.department(),
  }));

  for (const data of employeeData) {
    await prisma.employee.create({
      data,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
