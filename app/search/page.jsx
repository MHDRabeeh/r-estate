
import { Suspense } from 'react';
import SearchContent from './SearchContent';
import Loader from '../components/Loader';
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
export default async function Page() {

    const { userId } = await auth()
   
            if (!userId) {
               redirect("/sign-in")
            }
    
    return (
        <>
            <Suspense fallback={<Loader />}>
                <SearchContent />
            </Suspense>
        </>
    );
}
