import Image from "next/image";
import Link from "next/link";
import Card from "../app/components/Card";
import axios from "axios";
export default async function Home(params) {
  let rentListing = null;
  let saleListing = null;
  let furnishedListing = null;
  try {
    const { data } = await axios.get(process.env.URL + `/api/listing/get`, {
      params: {
        sell: "true",
        sort: "regularPrice_asc",
        limit: 3,
      },
    });
    saleListing = data.listings;

    
  } catch (error) {
    console.log(error.message);
  }
  try {
    const { data } = await axios.get(process.env.URL + `/api/listing/get`, {
      params: {
        rent: "true",
        sort: "regularPrice_asc",
        limit: 3,
      },
    });
    rentListing = data.listings;
    
  } catch (error) {
    console.log(error.message);
  }
  try {
    const { data } = await axios.get(process.env.URL + `/api/listing/get`, {
      params: {
        furnished: "true",
        sort: "regularPrice_asc",
        limit: 3,
      },
    });
    furnishedListing = data.listings;
    
  } catch (error) {
    console.log(error.message);
  }
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
          Let&apos;s Get Started
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
        {furnishedListing && furnishedListing.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">
                Recent Offers
              </h2>
              <Link
                href={"/search?furnished=true"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more listings
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {furnishedListing.map((property, i) => (
                <Card key={i} property={property} i={i} />
              ))}
            </div>
          </div>
        )}

        {rentListing && rentListing.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">
                {" "}
                Recent places for rent
              </h2>
              <Link
                href={"/search?rent=true"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more listings
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentListing.map((property, i) => (
                <Card key={i} property={property} i={i} />
              ))}
            </div>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">
                {" "}
                Recent places for sale
              </h2>
              <Link
                href={"/search?sell=true"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more listings
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {saleListing.map((property, i) => (
                <Card key={i} property={property} i={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
