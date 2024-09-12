import mongoose from "mongoose";

const pincodeSchema = mongoose.Schema({
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country:{ type: String, required: true },
});

export const PincodeModule = mongoose.model("pincode", pincodeSchema);


