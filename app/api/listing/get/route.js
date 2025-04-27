import mongoose from "mongoose";
import Listing from "../../../../models/Listing";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "../../../../config/db";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        {
          sucess: false,
          message: "Unauthorized access. User authentication failed.",
        },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(request.url);
    console.log({searchParams});
    
    await dbConnect();
    const query = {};
    // id search
    const listingId = searchParams.get("listingId");
    if (listingId) {
      query._id = listingId;
    }

    // Text search

    const keywords = searchParams.get("q");
    if (keywords) {
      query.$or = [
        { name: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
        { address: { $regex: keywords, $options: "i" } },
      ];
    }
    
    //Boolean filters

    ["furnished", "sell", "rent", "parking"].forEach((field) => {
      const value = searchParams.get(field);
      if (value === "true") {
        query[field] = true;
      }
    });

    // sort
    const sortValue = searchParams.get("sort");
    let sort = {};
    if (sortValue === "regularPrice_asc") {
      sort.discountPrice = 1;
    }else if(sortValue === "regularPrice_desc"){
      sort.discountPrice = -1
    }else if(sortValue === "createdAt_desc"){
    sort.createdAt = -1
    }else if (sortValue === "createdAt_asc"){
      sort.createdAt = 1
    }
    console.log(query,"query");
    
    const listings = await Listing.find(query).sort(sort);
    console.log("LLLLLLLLLLissssssss",listings);
    
    return NextResponse.json({ success: true, listings });
  } catch (error) {
    console.log("this is the error",error.message);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
