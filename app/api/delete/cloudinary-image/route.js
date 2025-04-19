import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../../config/db";
import Listing from "../../../../models/Listing";
import cloudinary from "../../../../config/cloudinary";
export async function PUT(request) {
  try {
   
    const { imageUrl,listingId } = await request.json();

    if (!imageUrl || !listingId) {
      return NextResponse.json({ success: false, message: "imageUrl and listingId is  required (1)" });
    }
    const { userId } = getAuth(request);
    await dbConnect();
    const list = await Listing.findOne({ userRef: userId });
    if (!list || userId !== list.userRef.toString()) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized: Not the owner",
      });
    }
    const publicId = imageUrl.split('/').pop().split('.')[0];
    const result = await cloudinary.uploader.destroy(publicId);
    if(result.result !== "ok"){
        return NextResponse.json({success:false,message:"cloudinary image deletion failed (2)"})
    }

    const updatedList = await Listing.findOneAndUpdate(
        { _id: listingId },
      { $pull: { imageUrls: imageUrl } },
      { new: true }
    );
    const  images =  updatedList.imageUrls
    return NextResponse.json({success:true,message:"image deletion successfull",images})
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({success:false,message:error.message})
    
  }
}
