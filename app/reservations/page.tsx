import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser?.id });

  if (reservations.length === 0) {
    return (
      <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties" />
    );
  }
  return <ReservationsClient reservations={reservations} currentUser={currentUser} />;
};

export default ReservationsPage;
