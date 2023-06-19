import getCurrentUser from '@/app/actions/getCurrentUser';
import primsa from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IPararms {
  listingId?: string;
}

export const POST = async (request: Request, { params }: { params: IPararms }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await primsa.user.update({ where: { id: currentUser.id }, data: { favoriteIds } });

  return NextResponse.json(user);
};

export const DELETE = async (request: Request, { params }: { params: IPararms }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await primsa.user.update({ where: { id: currentUser.id }, data: { favoriteIds } });

  return NextResponse.json(user);
};
