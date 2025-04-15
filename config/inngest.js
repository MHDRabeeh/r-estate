import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "../models/User";
export const inngest = new Inngest({ id: "estate-flow" });

export const syncUserCreation = inngest.createFunction(
    {id:"create-user-estate-flow"},
    {event:"estate-flow-clerk/user.created"},
    async({event})=>{
        console.log("Start user sync...");
        const {id,email_addresses,first_name,image_url,last_name} = event.data

        const userData = {
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name + " " + last_name,
            imageUrl:image_url
        }
        console.log("Connecting to DB...");
        await dbConnect()

        await User.create(userData)
        console.log("User created successfully.");


    }
)