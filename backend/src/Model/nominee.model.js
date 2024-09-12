import mongoose from "mongoose";

const nomineSchema = mongoose.Schema({
    nomineeId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },
    relationShip: { type: String, required: true },
    nomineeName: { type: String, required: true },
    DOB: { type: Date, required: true },
    address:{ type: String, required: true },
    pincodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pincode",
        required: true
    }
});

export const nomineModule = mongoose.model("nomine", nomineSchema);

