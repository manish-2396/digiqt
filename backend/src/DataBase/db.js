import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MOGO_DB)

const connection = mongoose.connect(process.env.MOGO_DB);

export { connection };
