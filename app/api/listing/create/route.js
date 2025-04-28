import dbConnect from "../../../../config/db";
import Listing from "../../../../models/Listing";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "../../../../config/cloudinary";
import { NextResponse } from "next/server";

// cloudinary configration

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Authorization  failed",
      });
    }
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const address = formData.get("address");
    const regularPrice = parseInt(formData.get("regularPrice"));
    const discountPrice = parseInt(formData.get("discountPrice"));
    const bedrooms = formData.get("bedrooms");
    const bathrooms = formData.get("bathrooms");
    const furnished = formData.get("furnished");
    const parking = formData.get("parking");
    const sell = formData.get("sell");
    const rent = formData.get("rent");
    // const type = formData.get("type");
    const files = formData.getAll("images");
    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "no files Uploaded",
      });
    }

    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    const image = result.map((result) => result.secure_url);
    await dbConnect();
    const listedData = await Listing.create({
      userRef: userId,
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bedrooms,
      bathrooms,
      furnished,
      parking,
      sell,
      rent,
      imageUrls: image,
      // type,
    });
    return NextResponse.json({
      success: true,
      message: "Upload successfull",
      listedData,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
