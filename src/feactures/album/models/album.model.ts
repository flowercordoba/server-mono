import mongoose, { Schema } from 'mongoose';
import { IAlbum } from '../interfaces/album.interface';

const mediaSchema: Schema = new Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], required: true }
});

const albumSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  privacy: { type: String, enum: ['public', 'private', 'friends'], required: true },
  media: { type: [mediaSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const AlbumModel = mongoose.model<IAlbum>('Album', albumSchema);
