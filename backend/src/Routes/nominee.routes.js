import { Router } from "express";
import { addNominee, addressCheck, deleteNominee, getNominee, updateNominee } from "../Controller/index.js";

export const NomineeRoutes = Router();


NomineeRoutes.post("/add" , addNominee);
NomineeRoutes.get("/get" , getNominee);
NomineeRoutes.patch("/update/:nomineeId" , updateNominee);
NomineeRoutes.delete("/remove/:nomineeId" , deleteNominee );
NomineeRoutes.get("/isCheck/:pincode" , addressCheck)



