import  { Document } from 'mongoose';


export interface INotification extends Document {
    userId: string;
    message: string;
    type: string;
    createdAt: Date;
  }
  