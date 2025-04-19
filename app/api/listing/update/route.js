import dbConnect from "../../../../config/db";
import Listing from "../../../../models/Listing";
import { getAuth } from "@clerk/nextjs/server";
import { uploadToCloudinary } from "../../../../lib/uploadToCloudinary";
import { NextResponse } from "next/server";
export async function PUT(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Authorization  failed",
      });
    }
    const formData = await request.formData();

    const listingId = formData.get("listingId");

    if (!listingId) {
      return NextResponse.json({
        success: false,
        message: "Lising ID is required",
      });
    }

    await dbConnect();
    const existingList = await Listing.findById(listingId);

    if (!existingList) {
      return NextResponse.json({ sucess: false, message: "Listing Not Found" });
    }

    if (existingList.useRef.toString() !== userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }
    let new_ImageUrls = [];
    const files = formData.getAll("");
    if (files && files.length > 0) {
      new_ImageUrls = await uploadToCloudinary(files);
    }
    const updateData = {
      name: formData.get("name"),
      description: formData.get("description"),
      address: formData.get("address"),
      regularPrice: formData.get("regularPrice"),
      discountPrice: formData.get("discountPrice"),
      bedrooms: formData.get("bedrooms"),
      bathrooms: formData.get("bathrooms"),
      furnished: formData.get("furnished"),
      parking: formData.get("parking"),
      sell: formData.get("sell"),
      rent: formData.get("rent"),
    };
    if (new_ImageUrls.length > 0) {
      updateData.imageUrls = [...existingList.imageUrls, ...new_ImageUrls];
    }
    const updatedExistingListing = await Listing.findByIdAndUpdate(
      listingId,
      updateData,
      { new: true }
    );
    return NextResponse.json({
      success: true,
      menubar: "Listing updated",
      listing: updatedExistingListing,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
