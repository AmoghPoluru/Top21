'use client';

import { useState, useEffect } from 'react';
// import { apiClient } from '@/app/libs/apiClient';  // Removed unused import
import { SafeListing } from '@/app/types';
import ListingCard from '@/app/components/listings/ListingCard';

interface ListingsContainerProps {
  initialListings: SafeListing[];
}

const ListingsContainer = ({ initialListings }: ListingsContainerProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {initialListings.map((listing) => (
        <ListingCard
          key={listing.id}
          data={listing}
        />
      ))}
    </div>
  );
};

export default ListingsContainer;