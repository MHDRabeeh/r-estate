import mongoose from "mongoose";
import Listing from "../../../../models/Listing";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "../../../../config/db";
export async function POST(request) {
  try {
    const { listingId } = await request.json();
    if (!listingId) {
      return NextResponse.json(
        { success: false, message: "Listing ID is required" },
        { status: 400 }
      );
    }
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access. User authentication failed.",
        },
        { status: 401 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
        return NextResponse.json(
          { success: false, message: "Invalid Listing ID format" },
          { status: 400 }
        );
      }
    await dbConnect();
    const list = await Listing.findById(listingId);
    if (!list) {
        return NextResponse.json(
          { success: false, message: "Listing not found" },
          { status: 404 }
        );
      }
    return NextResponse.json({ success: true, list });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
