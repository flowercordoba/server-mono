/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, Document } from 'mongoose';

export interface IStory extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const storySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const StoryModel = mongoose.model<IStory>('Story', storySchema);


