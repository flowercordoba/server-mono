/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, Document } from 'mongoose';
import { IVideo } from '../interfaces/video.interface';

const videoSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  privacy: { type: String, enum: ['public', 'private', 'friends'], default: 'public' },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

videoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const VideoModel = mongoose.model<IVideo>('Video', videoSchema);
