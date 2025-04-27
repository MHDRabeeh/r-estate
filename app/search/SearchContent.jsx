"use client"
import React from 'react'
import { useAuth } from "@clerk/nextjs";
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import CartCliet from '../components/CartCliet';
import Loader from '../components/Loader';
const SearchContent = () => {
    const router = useRouter();
    const SearchParams = useSearchParams();
    const { getToken} = useAuth()
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({
        rent: false,
        sell: false,
        parking: false,
        furnished: false
    });
    console.log(query);

    const [sort, setSort] = useState("")
    const [listing, setListing] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [count ,setCount]=useState(1)

    useEffect(() => {
        const q = SearchParams.get("q") || '';
        const newFilters = { ...filters };
        ["rent", "sell", "parking", "furnished"].forEach((key) => {
            newFilters[key] = SearchParams.get(key) === "true";
        });
        const sortParam = SearchParams.get("sort") || "regularPrice_desc";

        setQuery(q);
        setFilters(newFilters);
        setSort(sortParam);
    }, []);

    useEffect(() => {
        const fetchListingsFromParams = async () => {
            const params = new URLSearchParams();
            if (query) params.set('q', query);
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.set(key, "true");
            });
            if (sort) params.set("sort", sort)

            try {
                setLoading(true);
                const token = await getToken();
                console.log("thi is token", token);
                const { data } = await axios.get(`/api/listing/get?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
                setListing(data.listings)
            } catch (error) {
                console.error("error fetching Listing", error);
            } finally {
                setLoading(false)
            }
        }
        fetchListingsFromParams()
    }, [count])

    const handleSearch = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, "true");
        })
        if (sort) params.set("sort", sort);
        router.push(`/search?${params.toString()}`);
       setCount((prev)=>prev+1)
    }



    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSearch} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            onChange={((e) => setQuery(e.target.value))}
                        />
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        {/* <div className='flex gap-2'>
                            <input type='checkbox' id='all' className='w-5' />
                            <span>Rent & Sale</span>
                        </div> */}
                        <div className='flex gap-2'>
                            <input onChange={(e) => setFilters({ ...filters, rent: e.target.checked })} type='checkbox' id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                onChange={(e) => setFilters({ ...filters, sell: e.target.checked })}
                                type='checkbox' id='sale' className='w-5' />
                            <span>Sale</span>
                        </div>
                        {/* <div className='flex gap-2'>
                            <input onChange={()=>setFilters} 
                             type='checkbox' id='offer' className='w-5' />
                            <span>Offer</span>
                        </div> */}
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input
                                onChange={(e) => setFilters({ ...filters, parking: e.target.checked })}
                                type='checkbox' id='parking' className='w-5' />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                onChange={(e) => setFilters({ ...filters, furnished: e.target.checked })}
                                type='checkbox' id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select
                            onChange={(e) => setSort(e.target.value)}
                            id='sort_order' className='border rounded-lg p-3'>
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>

                    <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Search
                    </button>
                </form>
            </div>

            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
                    Listing results:
                </h1>

                <div className='p-7 flex flex-wrap gap-4'>

                    {Loading ? <Loader /> : <>
                        {listing ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listing?.map((property, i) => (
                                <CartCliet key={i} property={property} i={i} />
                            ))}
                        </div> : <p className='text-xl text-slate-700'>No listing found!</p>}



                    </>}

                    {/* Example placeholder for listing item */}
                    {

                    }


                    {/* <button className='text-green-700 hover:underline p-7 text-center w-full'>
                        Show more
                    </button> */}
                </div>

            </div>
        </div>

    )
}

export default SearchContent
