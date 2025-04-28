
import Listing from "../../../../models/Listing";
import { NextResponse } from "next/server";
import dbConnect from "../../../../config/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    
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
   
    // limit
    const limit = parseInt(searchParams.get("limit")) ;
  
    
   let listings;
  
    if(limit){
       listings = await Listing.find(query).sort(sort).limit(limit);
    }else{
       listings = await Listing.find(query).sort(sort);
    }
    return NextResponse.json({ success: true, listings });
   
  } catch (error) {
    console.log("this is the error",error.message);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
