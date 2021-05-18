import * as faker from 'faker';
import { PrismaClient } from '@prisma/client';

const data = Array.from({ length: 100 }).map(() => ({
  subject: faker.lorem.sentence(),
  content: faker.lorem.text(),
  contentHtml: faker.lorem.text(),
}));

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({ data });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
