"use client";
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useAuth } from "@clerk/nextjs";

const CreateListing = () => {
    const [data, setData] = useState({
        name: "", description: "", address: "", regularPrice: "",
        bathrooms: "",
        discountPrice: "",
        bedrooms: "",
        furnished: false,
        parking: false,
        // type: false,
        sell: false,
        rent: false,
        imageUrl: []
    })
    const { getToken } = useAuth()
    async function handleSubmit(e) {
        console.log(data);

        e.preventDefault()
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("address", data.address)
        formData.append("regularPrice", data.regularPrice)
        formData.append("bathrooms", data.bathrooms)
        formData.append("discountPrice", data.discountPrice)
        formData.append("bedrooms", data.bedrooms)
        formData.append("furnished", data.furnished)
        formData.append("parking", data.parking)
        formData.append("sell", data.sell)
        formData.append("rent", data.rent)
        data.imageUrl.forEach((file, index) => {
            formData.append("images", file);
        });

        try {
            const token = await getToken()
            const { data } = await axios.post("/api/listing/create", formData, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setData({
                    name: "", description: "", address: "", regularPrice: "",
                    bathrooms: "",
                    discountPrice: "",
                    bedrooms: "",
                    furnished: false,
                    parking: false,
                    // type: false,
                    sell: false,
                    rent: false,
                    imageUrl: []
                })
                console.log(data.listedData);

            } else {
                console.log(data);

            }
        } catch (error) {
            console.log(error.message);

        }

    }
    const removeNewSelectedImg = (selectedIndex) => {
        setData((prev) => {
            const existingImage = prev.imageUrl.filter((_, i) => selectedIndex !== i)
            return {
                ...prev,
                imageUrl: existingImage
            }
        })
    }

    return (
        <main className='max-w-4xl mx-auto p-3 '>
            <h2 className='text-3xl font-semibold text-center py-5'>Create a Listing</h2>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-5'>
                <div className='flex flex-col gap-3 sm:w-1/2 '>
                    <input required onChange={(e) => setData(pre => ({ ...pre, name: e.target.value }))} type="text" id='name' className=' w-full shadow-sm  border border-gray-300 rounded-lg p-3'
                        value={data.name} placeholder='Name' />

                    <textarea required onChange={(e) => setData(pre => ({ ...pre, description: e.target.value }))}
                        id="discription" className='w-full border border-gray-300 rounded-lg p-3'
                        value={data.description} placeholder='Discription'>
                    </textarea>
                    <input required onChange={(e) => setData(pre => ({ ...pre, address: e.target.value }))}
                        type="text" id='address' className=' w-full  border border-gray-300 rounded-lg p-3'
                        value={data.address} placeholder='Address' />

                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input type="checkbox" checked={data.sell} onChange={(e) => setData(pre => ({ ...pre, sell: e.target.checked }))} className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                onChange={(e) => setData(pre => ({ ...pre, rent: e.target.checked }))} type="checkbox" className='w-5'
                                checked={data.rent}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={(e) => setData(pre => ({ ...pre, parking: e.target.checked }))}
                                type="checkbox" className='w-5' checked={data.parking} />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={(e) => setData(pre => ({ ...pre, furnished: e.target.checked }))}
                                type="checkbox" className='w-5'
                                checked={data.furnished} />
                            <span>Furnished</span>
                        </div>
                        
                        {/* <div className='flex gap-2'>
                            <input
                                onChange={(e) => setData(pre => ({ ...pre, off: e.target.checked }))}
                                type="checkbox" className='w-5' />
                            <span>Offer</span>
                        </div> */}

                    </div>
                    <div className='flex my-4 flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input
                                required
                                onChange={(e) => setData(pre => ({ ...pre, bedrooms: e.target.value }))}
                                value={data.bedrooms}
                                type="number" className='w-14 h-10 p-3 border rounded-lg border-gray-300' />
                            <p>beds</p>

                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" required
                                onChange={(e) => setData(pre => ({ ...pre, bathrooms: e.target.value }))}
                                value={data.bathrooms}
                                className='w-14 h-10 p-3 border rounded-lg border-gray-300' />
                            <p>baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input min={"0"} type="number"
                                required onChange={(e) => setData(pre => ({ ...pre, regularPrice: e.target.value }))}
                                value={data.regularPrice}
                                className='w-20 h-10 p-3 border rounded-lg border-gray-300' />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-xs '>( $ / month)</span>
                            </div>

                        </div>
                        <div className='flex items-center gap-2'>
                            <input min={"0"} required onChange={(e) => setData(pre => ({ ...pre, discountPrice: e.target.value }))} type="number"
                             value={data.discountPrice}    className='w-20 h-10 p-3 border rounded-lg border-gray-300' />
                            <div className='flex flex-col items-center'>
                                <p>Discount price</p>
                                <span className='text-xs '>( $ / month)</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3 sm:w-1/2'>
                    <div className='flex items-center text-center'><span className='font-semibold text-gray-800'>Images:</span>
                        <p className='text-gray-500 text-sm'>The first image will be the cover (max 6)</p>
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                        {data.imageUrl && data.imageUrl.map((img, i) => {
                            const isFile = img instanceof File;
                            const src = isFile ? URL.createObjectURL(img) : img;

                            return (
                                <div key={i} className="relative group">

                                    <img
                                        key={i}
                                        src={src}
                                        alt="preview"

                                        className="object-cover rounded-lg border relative w-full h-24"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNewSelectedImg(i)}
                                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs "
                                    >
                                        ❌
                                    </button>
                                </div>
                            )

                        })}
                    </div>

                    <div className='flex  gap-3'>
                        <input
                            onChange={(e) => setData(prev => ({
                                ...prev,
                                imageUrl: Array.from(e.target.files)
                            }))}
                            type="file"
                            className='w-full rounded-lg p-3 border
                             file:border-1 file:p-2 file:rounded file:text-sm file:font-semibold
                             file:border-gray-400
                             border-gray-300'
                            multiple
                            id='images'
                            accept='image/*' />
                    </div>

                    <button type='submit' className='w-full p-3 bg-gray-700 text-white uppercase rounded'>Create Listing</button>


                </div>
            </form>

        </main>
    )
}

export default CreateListing
