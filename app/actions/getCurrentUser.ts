import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';
import { SafeUser } from '../types';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    return currentUser
      ? {
          ...currentUser,
          createdAt: currentUser.createdAt.toISOString(),
          updatedAt: currentUser.updatedAt.toISOString(),
          emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
      : null;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
