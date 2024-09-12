import { nomineModule } from "../Model/nominee.model.js";
import { PincodeModule } from "../Model/pinCode.model.js";


export const addNominee = async (req, res) => {
    try {
        const { relationShip, nomineeName, DOB, pincode, address, city, state, country, pincodeId } = req.body;
        let pincodeRecord = await PincodeModule.findOne({ pincode });
        if (!pincodeRecord) {
            pincodeRecord = new PincodeModule({ pincode, city, state, country });
            await pincodeRecord.save();
        }
        const newNominee = new nomineModule({
            relationShip,
            nomineeName,
            DOB,
            address,
            pincodeId: pincodeId ? pincodeId : pincodeRecord._id,
        });
        await newNominee.save();
        res.status(201).json({ success: true, data: "newNominee" });
    } catch (error) {

        res.status(500).json({ success: false, message: error });
    }

}

export const getNominee = async (req, res) => {
    try {
        const nominees = await nomineModule.aggregate([
            {
                $lookup: {
                    from: 'pincodes',
                    localField: 'pincodeId',
                    foreignField: '_id',
                    as: 'pincodeData'
                }
            },

        ]);

        res.status(200).json({ success: true, data: nominees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateNominee = async (req, res) => {
    try {
        const { relationShip, nomineeName, DOB, pincode, address, city, state, country } = req.body;
        const { nomineeId } = req.params;

        if (!nomineeId) {
            return res.status(400).json({ success: false, message: "Nominee ID is required" });
        }

        const nomineeToUpdate = await nomineModule.findById(nomineeId);

        if (!nomineeToUpdate) {
            return res.status(404).json({ success: false, message: "Nominee not found" });
        }

        nomineeToUpdate.relationShip = relationShip || nomineeToUpdate.relationShip;
        nomineeToUpdate.nomineeName = nomineeName || nomineeToUpdate.nomineeName;
        nomineeToUpdate.DOB = DOB || nomineeToUpdate.DOB;
        nomineeToUpdate.address = address || nomineeToUpdate.address;

        if (pincode) {
            let pincodeRecord = await PincodeModule.findOne({ pincode });
            if (!pincodeRecord) {
                pincodeRecord = new PincodeModule({ pincode, city, state, country });
                await pincodeRecord.save();
            }
            nomineeToUpdate.pincodeId = pincodeRecord._id;
        }

        await nomineeToUpdate.save();

        res.status(200).json({ success: true, message: "Nominee updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const deleteNominee = async (req, res) => {
    try {
        const nomineeId = req.params.nomineeId;
        const nominee = await nomineModule.findById(nomineeId);
        if (!nominee) {
            return res.status(404).json({ error: 'Nominee not found' });
        }
        const data = await nomineModule.deleteOne({ _id: nomineeId });
        console.log(data)
        res.status(200).json({ message: 'Nominee deleted successfully' });
    } catch (error) {
        console.error('Error deleting nominee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const addressCheck = async (req, res) => {
    try {
        const { pincode } = req.params;


        if (!pincode) {
            return res.status(400).json({ success: false, message: "Pincode is required" });
        }

        const pincodeRecord = await PincodeModule.findOne({ pincode });

        if (!pincodeRecord) {
            return res.status(404).json({ success: false, message: "Pincode not found" });
        }

        res.status(200).json({ success: true, data: pincodeRecord });
    } catch (error) {
        console.error('Error in addressCheck:', error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


