import getListings from './actions/get';
import getCurrentUser from './actions/getCurrentUser';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/ListingCard';

const Home = async () => {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  const isEmpty = listings.length === 0;

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => {
          return <ListingCard currentUser={currentUser} key={listing.id} data={listing} />;
        })}
      </div>
    </Container>
  );
};

export default Home;
