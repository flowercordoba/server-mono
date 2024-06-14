import mongoose, { Document, Schema } from 'mongoose';

 export interface IReport extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  reportedUserId: mongoose.Schema.Types.ObjectId;
  reason: string;
  createdAt: Date;
}

const reportSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ReportModel = mongoose.model<IReport>('Report', reportSchema);
