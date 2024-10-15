'use client';

import { useState } from 'react';
import Navbar from './components/navbar/Navbar';

export default function ClientWrapper({ children, currentUser }: { children: React.ReactNode, currentUser: any }) {
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearchChange = (location: string) => {
    setSearchLocation(location);
  };

  return (
    <>
      <Navbar currentUser={currentUser} onSearchChange={handleSearchChange} />
      {children}
    </>
  );
}