'use client';

import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/app/contexts/SearchContext';

const Search = () => {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearch();
  const [listingType, setListingType] = useState('Housing');
  const [buyRentOption, setBuyRentOption] = useState('Buy');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}&type=${encodeURIComponent(listingType)}&option=${encodeURIComponent(buyRentOption)}`);
    }
  };

  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <form onSubmit={handleSearch} className="flex flex-row items-center justify-between">
        <select
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
          className="appearance-none bg-transparent border-r border-gray-300 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option>Housing</option>
          <option>Business</option>
          <option>Franchise</option>
        </select>
        
        <select
          value={buyRentOption}
          onChange={(e) => setBuyRentOption(e.target.value)}
          className="appearance-none bg-transparent border-r border-gray-300 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option>Buy</option>
          <option>Rent</option>
        </select>
        
        <input
          className="text-sm font-semibold px-6 w-full outline-none bg-transparent"
          type="text"
          placeholder="Place, Neighborhood"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="p-2 bg-rose-500 rounded-full text-white mr-2">
          <BiSearch size={18} />
        </button>
      </form>
    </div>
  );
}

export default Search;