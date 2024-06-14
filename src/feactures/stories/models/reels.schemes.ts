import mongoose, { Document, Schema } from 'mongoose';

export interface IReel extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  videoUrl: string;
  createdAt: Date;
}

const reelSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ReelModel = mongoose.model<IReel>('Reel', reelSchema);
