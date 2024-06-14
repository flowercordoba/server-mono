import mongoose from 'mongoose';

export interface IVideo extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  privacy: 'public' | 'private' | 'friends';
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
