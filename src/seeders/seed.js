import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Créer des utilisateurs
  const hashedPassword = await bcrypt.hash('password', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
      },
    }),
    prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        password: hashedPassword,
        name: 'Regular User',
      },
    }),
  ]);

  console.log('👥 Users created:', users.length);

  // Créer des posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: 'Premier post',
        content: 'Contenu du premier post',
        authorId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Deuxième post',
        content: 'Contenu du deuxième post',
        authorId: users[1].id,
      },
    }),
  ]);

  console.log('📝 Posts created:', posts.length);
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
