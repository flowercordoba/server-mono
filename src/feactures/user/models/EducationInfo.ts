import mongoose, {  Document } from 'mongoose';

export interface IEducationInfo extends Document {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
}

const educationInfoSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const EducationInfoModel = mongoose.model<IEducationInfo>('EducationInfo', educationInfoSchema);
