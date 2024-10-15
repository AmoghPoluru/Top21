'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { SafeListing } from "@/app/types";

interface ListingCardProps {
  data: SafeListing;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/listings/${data.id}`);
  }, [router, data.id]);

  return (
    <div 
      onClick={handleClick}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt={data.title}
          />
        </div>
        <div className="font-semibold text-lg">
          {data.title}
        </div>
        <div className="font-light text-neutral-500">
          {data.locationValue}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            ${data.price}
          </div>
          <div className="font-light">night</div>
        </div>
        <div className="font-light text-sm">
          {data.roomCount} beds • {data.bathroomCount} baths • {data.guestCount} guests
        </div>
        <div className="font-light text-sm">
          {data.category}
        </div>
      </div>
    </div>
  );
}
 
export default ListingCard;