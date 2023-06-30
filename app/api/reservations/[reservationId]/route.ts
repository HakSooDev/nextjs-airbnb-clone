import getCurrentUser from '@/app/actions/getCurrentUser';
import primsa from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IPararms {
  reservationId?: string;
}

export const DELETE = async (request: Request, { params }: { params: IPararms }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await primsa.reservation.deleteMany({
    where: { id: reservationId, OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }] },
  });

  return NextResponse.json(reservation);
};
