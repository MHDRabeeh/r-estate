import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../../config/db";

export async function POST(request){
    try {
        const {imageUrl,clientUserId} = await request.json()
        if(!imageUrl){
            return NextResponse({success:false,message:"imageUrl required"})
        }
           const { userId } = getAuth(request);
           await dbConnect()

           


    } catch (error) {
        
    }

}


