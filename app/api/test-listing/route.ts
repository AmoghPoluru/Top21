import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    console.log('Database URL:', process.env.DATABASE_URL);
    console.log('Attempting to connect to the database...');
    
    // Log the list of collections in the database
    const collections: any = await prisma.$runCommandRaw({
      listCollections: 1,
      nameOnly: true
    });
    console.log('Collections in the database:', collections);

    console.log('Attempting to fetch listings...');
    const listings = await prisma.listing.findMany();
    console.log('Listings from database:', JSON.stringify(listings, null, 2));

    return NextResponse.json({ 
      collections: Array.isArray(collections.cursor?.firstBatch) 
        ? collections.cursor.firstBatch 
        : [],
      listingsCount: listings.length, 
      listings: listings
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch listings', details: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
