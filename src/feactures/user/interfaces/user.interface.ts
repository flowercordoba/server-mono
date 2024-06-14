import mongoose, { Document, ObjectId } from 'mongoose';

// Definición de tipos adicionales para las propiedades complejas
interface IExperience {
  [key: string]: string | number | boolean | undefined;
  _id?: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorkingHere: boolean | undefined;
}

interface IEducation {
  [key: string]: string | number | undefined;
  _id?: string;
  country: string;
  university: string;
  title: string;
  major: string;
  year: string;
}

interface ICertificate {
  [key: string]: string | number | undefined;
  _id?: string;
  name: string;
  from: string;
  year: number | string;
}

interface ILanguage {
  [key: string]: string | number | undefined;
  _id?: string;
  language: string;
  level: string;
}

// Tipo genérico para las propiedades de ISellerDocument
export type SellerType =
  | string
  | string[]
  | number
  | Date
  | IExperience
  | IExperience[]
  | IEducation
  | IEducation[]
  | ICertificate
  | ICertificate[]
  | ILanguage
  | ILanguage[]
  | unknown
  | undefined;

// Interfaz ISellerDocument extendiendo Record<string, SellerType>
export interface ISellerDocument extends Record<string, SellerType> {
  _id?: string | ObjectId;
  profilePublicId?: string;
  fullName: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  description: string;
  country: string;
  oneliner: string;
  skills: string[];
  ratingsCount?: number;
  ratingSum?: number;
  languages: ILanguage[];
  responseTime: number;
  recentDelivery?: Date | string;
  experience: IExperience[];
  education: IEducation[];
  socialLinks: string[];
  certificates: ICertificate[];
  ongoingJobs?: number;
  completedJobs?: number;
  cancelledJobs?: number;
  totalEarnings?: number;
  totalGigs?: number;
  paypal?: string; // not needed
  createdAt?: Date | string;
}

// Definición de IUser asegurando la compatibilidad con Document
export interface IUser extends Document {
  authId: mongoose.Schema.Types.ObjectId;
  email: string;
  username: string;
  profilePicture?: string;
  contactInfo?: mongoose.Schema.Types.ObjectId;
  educationInfo?: mongoose.Schema.Types.ObjectId;
  jobInfo?: mongoose.Schema.Types.ObjectId;
  imagesId?: mongoose.Schema.Types.ObjectId;
  social?: mongoose.Schema.Types.ObjectId;
  featuredFriends?: mongoose.Schema.Types.ObjectId[];
  savedPosts?: mongoose.Schema.Types.ObjectId[];
  friends: IUser[];
  friendsCount: number;
  reels?: mongoose.Schema.Types.ObjectId[];
  stories?: mongoose.Schema.Types.ObjectId[];
  notifications?: mongoose.Schema.Types.ObjectId[];
  posts?: mongoose.Schema.Types.ObjectId[];
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
  blocked?: mongoose.Schema.Types.ObjectId[];
  blockedBy?: mongoose.Schema.Types.ObjectId[];
  work?: string;
  school?: string;
  location?: string; // Compatibilidad corregida
  birthday?: string;
  gender?: string;
  termins?: string;
  quote?: string;
  aboutme?: string;
  lastname?: string;
  bgImageVersion?: string;
  bgImageId?: string;
  privacy?: string;
  lastActive?: Date;
}
