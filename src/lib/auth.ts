import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/lib/db';
import type { UserRole } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && user.email) {
        const allowedDomain = process.env.ALLOWED_DOMAIN || 'university.edu';
        
        // Check if email ends with allowed domain
        if (!user.email.endsWith(`@${allowedDomain}`)) {
          console.log(`Blocked sign-in attempt from unauthorized domain: ${user.email}`);
          return false;
        }
        
        // Update user role if they're an admin
        try {
          const existingUser = await db.user.findUnique({
            where: { email: user.email }
          });
          
          if (!existingUser) {
            // Create new user with default STUDENT role
            await db.user.create({
              data: {
                email: user.email,
                name: user.name || '',
                image: user.image,
                role: 'STUDENT' as UserRole,
                emailVerified: new Date(),
              }
            });
          }
        } catch (error) {
          console.error('Error creating/updating user:', error);
        }
      }
      
      return true;
    },
    async session({ session, user }) {
      if (session.user && user) {
        const dbUser = await db.user.findUnique({
          where: { email: session.user.email! }
        });
        
        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
          session.user.studentId = dbUser.studentId;
          session.user.department = dbUser.department;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
};