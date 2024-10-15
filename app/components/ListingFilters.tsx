'use client';

import React, { useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: string) => void;
}

interface FilterState {
  price: string;
  bedsBaths: string;
  homeType: string;
}

const ListingFilters: React.FC<FiltersProps> = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    price: '',
    bedsBaths: '',
    homeType: ''
  });

  const handleFilterChange = (filterName: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
      <select 
        className="p-2 border rounded"
        onChange={(e) => handleFilterChange('price', e.target.value)}
        value={filters.price}
      >
        <option value="">Price</option>
        <option value="0-100000">$0 - $100,000</option>
        <option value="100000-200000">$100,000 - $200,000</option>
        <option value="200000-300000">$200,000 - $300,000</option>
        <option value="300000+">$300,000+</option>
      </select>

      <select 
        className="p-2 border rounded"
        onChange={(e) => handleFilterChange('bedsBaths', e.target.value)}
        value={filters.bedsBaths}
      >
        <option value="">Beds / Baths</option>
        <option value="1+">1+ bed</option>
        <option value="2+">2+ beds</option>
        <option value="3+">3+ beds</option>
        <option value="4+">4+ beds</option>
      </select>

      <select 
        className="p-2 border rounded"
        onChange={(e) => handleFilterChange('homeType', e.target.value)}
        value={filters.homeType}
      >
        <option value="">Home Type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="condo">Condo</option>
        <option value="townhouse">Townhouse</option>
      </select>

      <select 
        className="p-2 border rounded"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="recommended">Sort: Recommended</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="date-desc">Newest</option>
      </select>
    </div>
  );
};

export default ListingFilters;