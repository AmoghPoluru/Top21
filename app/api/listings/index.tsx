import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  price: number;
  userId: string;
}

interface ListingsProps {
  initialListings: Listing[];
}

export const getServerSideProps: GetServerSideProps<ListingsProps> = async () => {
  const prisma = new PrismaClient()
  const listings = await prisma.listing.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  })

  return {
    props: {
      initialListings: JSON.parse(JSON.stringify(listings))
    }
  }
}

export default function Listings({ initialListings }: ListingsProps) {
  const [listings, setListings] = useState(initialListings)
  const [page, setPage] = useState(1)

  const loadMore = async () => {
    const nextPage = page + 1
    const response = await axios.get(`/api/listings/search?page=${nextPage}&limit=10`)
    setListings([...listings, ...response.data.listings])
    setPage(nextPage)
  }

  return (
    <div>
      <h1>All Listings</h1>
      {listings.map((listing) => (
        <div key={listing.id}>
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
          <img src={listing.imageSrc} alt={listing.title} style={{maxWidth: '200px'}} />
          <p>Price: ${listing.price}</p>
          {/* Add other listing details */}
        </div>
      ))}
      <button onClick={loadMore}>Load More</button>
    </div>
  )
}