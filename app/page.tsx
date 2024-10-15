import ClientOnly from "./components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getListings from "@/app/actions/getListings";
import ListingsContainer from './components/ListingsContainer';  // Import your new container
import MapSearch from './components/MapSearch';

export default async function Home() {
  const initialListings = await getListings({});

  if (initialListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] pt-24">
          {/* Left half: Listings */}
          <div className="w-full lg:w-1/2 overflow-y-auto pr-4 mb-4 lg:mb-0">
            <ListingsContainer initialListings={initialListings.map(listing => ({
              ...listing,
              createdAt: listing.createdAt
            }))} />
          </div>
          
          {/* Right half: Map */}
          <div className="w-full lg:w-1/2 h-full sticky top-24">
            <MapSearch />
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}
