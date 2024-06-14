import mongoose, {  Document } from 'mongoose';

export interface IContactInfo extends Document {
  phone: string;
  address: string;
}

const contactInfoSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

export const ContactInfoModel = mongoose.model<IContactInfo>('ContactInfo', contactInfoSchema);
