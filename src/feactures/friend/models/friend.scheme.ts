import mongoose, { Document, Model, Schema } from 'mongoose';

 interface IFriend extends Document {
  userId: mongoose.Types.ObjectId;
  friendId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

const friendSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Friend: Model<IFriend> = mongoose.model<IFriend>('Friend', friendSchema);

export { Friend, IFriend };
