// app/libs/apiClient.ts

import { IListingsParams, SafeListing } from "@/app/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const apiClient = {
  getListings: async (params: IListingsParams = {}): Promise<SafeListing[]> => {
    try {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, value.toString());
        }
      });

      const response = await fetch(`${BASE_URL}/api/listings?${searchParams.toString()}`, { cache: 'no-store' });
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      return response.json();
    } catch (error: any) {
      console.error('Error in getListings:', error);
      throw new Error(error);
    }
  },

  // You can add other API methods here as needed
};