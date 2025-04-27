import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: String,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    sell: {
      type: Boolean,
      required: true,
    },
    rent: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
      ref: "User",
      index: true,
    },
  },
  { timestamps: true }
);

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", ListingSchema);
export default Listing;
