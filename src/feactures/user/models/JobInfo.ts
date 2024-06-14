import mongoose, {  Document } from 'mongoose';

export interface IJobInfo extends Document {
  company: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

const jobInfoSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const JobInfoModel = mongoose.model<IJobInfo>('JobInfo', jobInfoSchema);
