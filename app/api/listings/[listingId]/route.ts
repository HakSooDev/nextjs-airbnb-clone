import getCurrentUser from '@/app/actions/getCurrentUser';
import primsa from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IPararms {
  listingId?: string;
}

export const DELETE = async (request: Request, { params }: { params: IPararms }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await primsa.listing.deleteMany({
    where: { id: listingId, userId: currentUser.id },
  });

  return NextResponse.json(listing);
};
