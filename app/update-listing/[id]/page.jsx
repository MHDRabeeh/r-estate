"use client"
import { useAuth } from "@clerk/nextjs";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
export default function UpdateListing() {
    const { getToken } = useAuth()
    const { id: listingId } = useParams();

    const [cloudinaryPublicId, setCloudinaryPublicId] = useState([])
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
        imageUrls: []
    })

    useEffect(() => {

        const fetchData = async () => {
            try {
                const token = await getToken();
                const { data } = await axios.post("/api/listing/get", { listingId }, { headers: { Authorization: `Bearer ${token}` } })
                console.log(data);
                if (data.success) {
                    setData(data.list);


                }
            } catch (error) {
                console.error("Failed to fetch listing:", error);
            }

        }

        fetchData()
    }, [getToken, listingId])

    async function handleSubmit(e) {
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
        data.imageUrls.forEach((file, index) => {
            formData.append("images", file);
        });
        try {

        } catch (error) {

        }
    }
    const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];
    const removeImage = async (indexToRemove) => {
        try {

        } catch (error) {

        }
    }
    return (
        <main className='max-w-4xl mx-auto p-3 '>
            <h2 className='text-3xl font-semibold text-center py-5'>Create a Listing</h2>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-5'>
                <div className='flex flex-col gap-3 sm:w-1/2 '>
                    <input onChange={(e) => setData(pre => ({ ...pre, name: e.target.value }))} type="text" id='name' className=' w-full shadow-sm  border border-gray-300 rounded-lg p-3'
                        value={data.name} placeholder='Name' />

                    <textarea onChange={(e) => setData(pre => ({ ...pre, description: e.target.value }))}
                        id="discription" className='w-full border border-gray-300 rounded-lg p-3'
                        value={data.description} placeholder='Discription'>
                    </textarea>
                    <input onChange={(e) => setData(pre => ({ ...pre, address: e.target.value }))}
                        type="text" id='address' className=' w-full  border border-gray-300 rounded-lg p-3'
                        value={data.address} placeholder='Address' />

                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input type="checkbox" onChange={(e) => setData(pre => ({ ...pre, sell: e.target.checked }))} className='w-5'
                                checked={data.sell}
                            />
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
                                type="checkbox" className='w-5'
                                checked={data.parking} />
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
                                onChange={(e) => setData(pre => ({ ...pre, bedrooms: e.target.value }))}
                                value={data.bedrooms} type="text" className='w-10 h-10 p-3 border rounded-lg border-gray-300' />
                            <p>beds</p>

                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="text"
                                onChange={(e) => setData(pre => ({ ...pre, bathrooms: e.target.value }))}
                                value={data.bathrooms}
                                className='w-10 h-10 p-3 border rounded-lg border-gray-300' />
                            <p>baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="text"
                                onChange={(e) => setData(pre => ({ ...pre, regularPrice: e.target.value }))}
                                value={data.regularPrice}
                                className='w-10 h-10 p-3 border rounded-lg border-gray-300' />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-xs '>( $ / month)</span>
                            </div>

                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={(e) => setData(pre => ({ ...pre, discountPrice: e.target.value }))}
                                value={data.discountPrice}
                                type="text" className='w-10 h-10 p-3 border rounded-lg border-gray-300' />
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
                    <div className="grid grid-cols-3 gap-3">
                        {/* Show existing image URLs */}
                        {data.imageUrls && data.imageUrls.map((img, i) => {
                            const isFile = img instanceof File;
                            const src = isFile ? URL.createObjectURL(img) : img;
                            return (
                                <div key={i} className="relative group">
                                    <img 
                                        key={i}
                                        src={src}
                                        alt="preview"
                                        className="h-24 w-full object-cover rounded-lg border"
                                    />
                                    {/* <div type="button" class=" absolute  animate-spin " disabled>

                                        <ImSpinner9  size={30}  className="text-black"/>
                                    </div> */}
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs hidden group-hover:block"
                                    >
                                        ❌
                                    </button>
                                </div>
                            );
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
