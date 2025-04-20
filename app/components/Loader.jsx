import React from 'react'

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
            <div><Toaster /></div>

            {/* Professional bouncing dots - subtle blue/gray gradient */}
            <div className="flex space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full 
                                animate-[bounce_1s_infinite_75ms]"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full 
                                animate-[bounce_1s_infinite_200ms]"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full 
                                animate-[bounce_1s_infinite_300ms]"></div>
            </div>

            {/* Minimalist loading text */}
            <p className="mt-5 text-gray-700 font-medium tracking-wide animate-pulse">
                Loading data...
            </p>
        </div>
    )
}

export default Loader
