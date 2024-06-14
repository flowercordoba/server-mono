import mongoose from 'mongoose';

export interface IMedia {
  url: string;
  type: 'image' | 'video';
}

export interface IAlbum extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  privacy: 'public' | 'private' | 'friends';
  media: IMedia[];
  createdAt: Date;
  updatedAt: Date;
}
