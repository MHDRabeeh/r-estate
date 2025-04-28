
import { FaLocationDot } from "react-icons/fa6";
import { FaBath, FaBed } from "react-icons/fa";
import { TbParkingCircle } from "react-icons/tb";

import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Card({ property }) {
  return (
    <div className="group w-full flex flex-col gap-0 shadow-md rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
      {/* Image Container (about 70% of card) */}
      <div className="w-full aspect-[3/2] relative overflow-hidden">
        <Image
          src={property?.imageUrls[0]}
          alt={`${property.name} property`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-cyan-500 text-white px-2 py-0.5 rounded text-xs font-bold transition-all duration-300 group-hover:bg-cyan-600">
          {property.type === "rent" ? "For Rent" : "For Sale"}
        </div>
        {property.discountPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
            Special Offer
          </div>
        )}
      </div>

      {/* Content Container (about 30% of card) */}
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex justify-between items-start">
          <h2 className="text-[15px] font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
            {property.name}
          </h2>
          <div className="text-right">
            {property.discountPrice ? (
              <>
                <p className="text-[20px] font-bold text-cyan-600">
                  ${property.discountPrice}
                  <span className="text-[11px] font-normal text-gray-500">
                    {property.type === "rent" ? "/mo" : ""}
                  </span>
                </p>
                <p className="text-[11px] text-gray-400 line-through">
                  ${property.regularPrice}
                </p>
              </>
            ) : (
              <p className="text-[15px] font-bold text-cyan-600">
                ${property.price}
                <span className="text-[11px] font-normal text-gray-500">
                  {property.type === "rent" ? "/mo" : ""}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="text-cyan-500 text-[12px] flex items-center gap-1">
          <FaLocationDot size={12} className="group-hover:translate-x-0.5 transition-transform" />
          <span className="line-clamp-1">{property.address?.split(",")[0]}</span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-600 line-clamp-2 mt-0">
          {property.description}
        </p>

        {/* Amenities */}
        <div className="flex gap-2 items-center mt-1.5 pt-1.5 border-t border-gray-100">
          <div className="flex gap-1 items-center text-cyan-600 hover:text-cyan-700 transition-colors">
            <FaBed size={12} />
            <span className="text-[12px] font-medium">
              {property.bedrooms}
            </span>
          </div>
          <div className="flex gap-1 items-center text-cyan-600 hover:text-cyan-700 transition-colors">
            <FaBath size={12} />
            <span className="text-[12px] font-medium">
              {property.bathrooms}
            </span>
          </div>
          {property.parking && (
            <div className="flex gap-1 items-center text-cyan-600 hover:text-cyan-700 transition-colors">
              <TbParkingCircle size={12} />
            </div>
          )}
        </div>

        <Link href={`/details-page/${property._id}`} className="mt-2 w-full bg-cyan-500 hover:bg-cyan-600 text-center block text-white py-1.5 rounded text-[13px] font-medium transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
}