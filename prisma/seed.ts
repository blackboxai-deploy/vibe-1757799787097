import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default categories
  const categories = [
    {
      name: 'Academic Support',
      description: 'Help fellow students with textbooks, supplies, and educational needs',
      color: '#3B82F6',
      icon: '🎓'
    },
    {
      name: 'Emergency Aid',
      description: 'Support students facing unexpected financial difficulties',
      color: '#EF4444',
      icon: '🆘'
    },
    {
      name: 'Campus Improvement',
      description: 'Projects to enhance campus facilities and student life',
      color: '#10B981',
      icon: '🏫'
    },
    {
      name: 'Community Service',
      description: 'Give back to the local community and those in need',
      color: '#F59E0B',
      icon: '🤝'
    },
    {
      name: 'Research & Innovation',
      description: 'Fund student research projects and innovative ideas',
      color: '#8B5CF6',
      icon: '🔬'
    },
    {
      name: 'Sports & Recreation',
      description: 'Support athletic teams and recreational activities',
      color: '#06B6D4',
      icon: '⚽'
    }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  console.log('✅ Categories seeded successfully');

  // Create a demo admin user (for development)
  await prisma.user.upsert({
    where: { email: 'admin@university.edu' },
    update: {},
    create: {
      email: 'admin@university.edu',
      name: 'Admin User',
      role: UserRole.ADMIN,
      studentId: 'ADM001',
      department: 'Administration',
      year: 4,
      bio: 'Platform administrator'
    }
  });

  console.log('✅ Admin user created successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });