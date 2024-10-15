import prisma from "@/app/libs/prismadb";



export default async function getListings() {
  try {
    console.log('getListings called to retrieve all listings');

    const listings = await prisma.listing.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        imageSrc: true,
        createdAt: true,
        category: true,
        roomCount: true,
        bathroomCount: true,
        guestCount: true,
        locationValue: true,
        userId: true,
        price: true,
        // Add any other fields you need
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      imageSrc: listing.imageSrc || '/images/placeholder.jpg'
    }));

  } catch (error: any) {
    console.error('Error in getListings:', error);
    throw new Error(error.message || 'An error occurred while fetching listings');
  }
}
