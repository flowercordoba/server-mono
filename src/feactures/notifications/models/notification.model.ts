import mongoose, { Document, Model, Schema } from 'mongoose';

 interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  type: 'friend-request' | 'friend-accept' | 'mention' | 'share';
  createdAt: Date;
}

const notificationSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['friend-request', 'friend-accept', 'mention', 'share'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Notification: Model<INotification> = mongoose.model<INotification>('Notification', notificationSchema);

export { Notification, INotification };
