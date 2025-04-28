"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaSearch, FaHome, FaInfoCircle, FaPlus } from 'react-icons/fa'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation';

export default function Header() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(searchParams);
        const searchTermFromUrl = urlParams.get('q');
        if (searchTermFromUrl) {

            (searchTermFromUrl);
        }
    }, [searchParams]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(searchParams);
        urlParams.set('q', searchTerm);
        const searchQuery = urlParams.toString();
        router.push(`/search?${searchQuery}`);
      };
    return (
        <header className='bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100'>
            <div className='flex justify-between items-center max-w-7xl mx-auto px-4 py-3'>
                {/* Logo */}
                <Link href="/" className='flex items-center space-x-1'>
                    <h1 className='font-bold text-xl md:text-2xl'>
                        <span className='text-blue-600'>Estate</span>
                        <span className='text-gray-800'>Flow</span>
                    </h1>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSubmit} className='hidden md:flex bg-gray-50 px-4 py-2 rounded-lg flex items-center flex-1 max-w-md mx-6 border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all'>
                    <input
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder='Search properties...'
                        className='bg-transparent focus:outline-none w-full text-gray-700 placeholder-gray-400'
                    />
                    <button type="submit" className='text-gray-500 hover:text-blue-600 transition-colors'>
                        <FaSearch />
                    </button>
                </form>

                {/* Navigation */}
                <nav className='flex items-center space-x-4'>
                    <Link href="/" className='hidden md:flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50'>
                        <FaHome className='text-sm' />
                        <span className='text-sm font-medium'>Home</span>
                    </Link>

                    <Link href="/about" className='hidden md:flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50'>
                        <FaInfoCircle className='text-sm' />
                        <span className='text-sm font-medium'>About</span>
                    </Link>

                    <div className='ml-2 flex items-center gap-3'>
                        <SignedIn>
                            <Link
                                href="/create-listing"
                                className='font-medium text-sm text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-2 rounded-full transition-colors whitespace-nowrap'
                            >
                                Add Property
                            </Link>
                            <UserButton afterSignOutUrl="/" appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-8 h-8",
                                }
                            }} />
                        </SignedIn>
                        <SignedOut>
                            <Link href="/sign-in" className='text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors'>
                                Sign in
                            </Link>
                        </SignedOut>
                    </div>
                </nav>
            </div>

            {/* Mobile Search - appears only on small screens */}
            <div className='md:hidden px-4 pb-3'>
                <form className='bg-gray-50 px-4 py-2 rounded-lg flex items-center border border-gray-200'>
                    <input
                        type="text"
                        placeholder='Search properties...'
                        className='bg-transparent focus:outline-none w-full text-gray-700 placeholder-gray-400'
                    />
                    <button type="submit" className='text-gray-500 hover:text-blue-600 transition-colors'>
                        <FaSearch />
                    </button>
                </form>
            </div>
        </header>
    )
}