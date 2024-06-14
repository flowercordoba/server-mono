import mongoose, {  Document } from 'mongoose';

export interface ISocial extends Document {
  facebook: string;
  twitter: string;
  instagram: string;
}

const socialSchema = new mongoose.Schema({
  facebook: { type: String, required: true },
  twitter: { type: String, required: true },
  instagram: { type: String, required: true },
});

export const SocialModel = mongoose.model<ISocial>('Social', socialSchema);
