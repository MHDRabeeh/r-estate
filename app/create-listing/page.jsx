import React from 'react'

const CreateListing = () => {
    return (
        <main className='max-w-4xl mx-auto p-3 '>
            <h2 className='text-3xl font-semibold text-center py-5'>Create a Listing</h2>
            <div className='flex flex-col sm:flex-row gap-5'>
                <div className='flex flex-col gap-3 sm:w-1/2 '>
                    <input type="text" id='name' className=' w-full shadow-sm  border border-gray-300 rounded-lg p-3'
                        placeholder='Name' />

                    <textarea id="discription" className='w-full border border-gray-300 rounded-lg p-3'
                        placeholder='Discription'>

                    </textarea>
                    <input type="text" id='address' className=' w-full  border border-gray-300 rounded-lg p-3'
                        placeholder='Address' />

                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' />
                            <span>Offer</span>
                        </div>

                    </div>
                    <div className='flex my-4 flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type="text" className='w-10 h-10 p-3 border rounded-lg border-gray-300' />
                            <p>beds</p>

                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="text" className='w-10 h-10 p-3 border rounded-lg border-gray-300' />
                            <p>baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="text" className='w-10 h-10 p-3 border rounded-lg border-gray-300' />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-xs '>( $ / month)</span>
                            </div>

                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="text" className='w-10 h-10 p-3 border rounded-lg border-gray-300' />
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
                    <div className='flex  gap-3'>
                        <input type="file"
                            className='w-full rounded-lg p-3 border
                             file:border-1 file:p-2 file:rounded file:text-sm file:font-semibold
                             file:border-gray-400
                             border-gray-300'
                            multiple
                            id='images'
                            accept='image/*' />
                        <button className='text-green-700 border border-green-700 p-3 rounded-lg uppercase'>Upload</button>
                    </div>

                    <button className='w-full p-3 bg-gray-700 text-white uppercase rounded'>Create Listing</button>


                </div>
            </div>

        </main>
    )
}

export default CreateListing
