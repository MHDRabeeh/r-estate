"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import CartClient from "../components/CartCliet";
import Loader from "../components/Loader";

const SearchContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    rent: false,
    sell: false,
    parking: false,
    furnished: false,
  });
  const [sort, setSort] = useState("regularPrice_desc");
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const q = searchParams.get("q") || '';
    const newFilters = { ...filters };
    ["rent", "sell", "parking", "furnished"].forEach((key) => {
      newFilters[key] = searchParams.get(key) === "true";
    });
    const sortParam = searchParams.get("sort") || "regularPrice_desc";

    setQuery(q);
    setFilters(newFilters);
    setSort(sortParam);

    if (q || Object.values(newFilters).some(v => v)) {
      fetchListings(q, newFilters, sortParam);
    }
  }, []);


  const fetchListings = async (q, filtersData, sortData) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    Object.entries(filtersData).forEach(([key, value]) => {
      if (value) params.set(key, "true");
    });
    if (sortData) params.set("sort", sortData);

    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get(`/api/listing/get?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListing(data.listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, "true");
    });
    if (sort) params.set("sort", sort);

    router.push(`/search?${params.toString()}`);
    await fetchListings(query, filters, sort);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Filters */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSearch} className="flex flex-col gap-8">
          {/* Search Form Here */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={filters.rent}
                onChange={(e) => setFilters({ ...filters, rent: e.target.checked })}
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={filters.sell}
                onChange={(e) => setFilters({ ...filters, sell: e.target.checked })}
                className="w-5"
              />
              <span>Sale</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={filters.parking}
                onChange={(e) => setFilters({ ...filters, parking: e.target.checked })}
                className="w-5"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={filters.furnished}
                onChange={(e) => setFilters({ ...filters, furnished: e.target.checked })}
                className="w-5"
              />
              <span>Furnished</span>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          >
            Search
          </button>
        </form>
      </div>

      {/* Listings */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {loading ? (
            <Loader />
          ) : listing && listing.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listing.map((property, i) => (
                <CartClient key={i} property={property} i={i} />
              ))}
            </div>
          ) : (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchContent;
