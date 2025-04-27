import Image from "next/image";
import Link from "next/link";
import Card from "../app/components/Card";

export default async function Home(params) {
  let property = [
    {
      name: "Sunny Ridge Apartment",
      description:
        "A modern apartment with lots of natural light, near central park and shopping area.",
      address: "123 Sunshine Blvd, New York, NY 10001",
      regularPrice: 1200,
      discountPrice: 999,
      bathrooms: 2,
      bedrooms: 3,
      parking: true,
      type: "rent",
      imageUrl:
        "https://res.cloudinary.com/dxju52nqy/image/upload/v1745126351/xfhiumkh6wsj0wl7eke9.jpg",
    },
  ];
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl flex flex-col gap-6 mx-auto py-20 px-4">
        <h1 className="text-5xl text-gray-900 font-bold">
          Find your next <span className="text-cyan-500">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-gray-600 text-sm">
          Estate flow is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </p>
        <Link
          href={"/search"}
          className="bg-blue-800 text-white px-4 py-2 w-max rounded-md text-sm hover:bg-blue-700 transition"
        >
          Let&apos; s Get Started
        </Link>
      </div>

      <div className="relative w-full h-screen max-h-[600px] overflow-hidden group">
        <Image
          src="https://res.cloudinary.com/dxju52nqy/image/upload/v1745144610/gqlijzffitacto4di16p.jpg"
          alt="Luxury property showcase"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">


        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Recent Offers</h2>
            <Link
              href={"/showmore"}
              className="text-sm text-blue-800 hover:underline"
            >
              Show more listings
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.map((property, i) => (
              <Card key={i} property={property} i={i} />
            ))}
          </div>
        </div>


        <div className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700"> Recent places for rent</h2>
            <Link
              href={"/showmore"}
              className="text-sm text-blue-800 hover:underline"
            >
              Show more listings
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.map((property, i) => (
              <Card key={i} property={property} i={i} />
            ))}
          </div>
        </div>



        <div className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">   Recent places for sale</h2>
            <Link
              href={"/showmore"}
              className="text-sm text-blue-800 hover:underline"
            >
              Show more listings
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.map((property, i) => (
              <Card key={i} property={property} i={i} />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}
