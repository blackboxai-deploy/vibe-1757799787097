import type { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      studentId?: string | null;
      department?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: UserRole;
    studentId?: string | null;
    department?: string | null;
  }
}