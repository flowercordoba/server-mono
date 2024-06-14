/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';


export interface IUser extends Document {
  authId: mongoose.Schema.Types.ObjectId;
  email: string;
  profilePicture?: string;
  contactInfo?: mongoose.Schema.Types.ObjectId;
  educationInfo?: mongoose.Schema.Types.ObjectId;  // Añadir referencia a EducationInfo
  jobInfo?: mongoose.Schema.Types.ObjectId;  // Añadir referencia a JobInfo

}

const userSchema = new mongoose.Schema( {
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', index: true },
    username: { type: String, index: true },  // Agregar índice aquí
    email: { type: String, index: true },  // Agregar índice aquí
    profilePicture: { type: String, default: '' },
    postsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number },
    blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    work: { type: String, default: '' },
    school: { type: String, default: '' },
    location: { type: String, default: '' },
    birthday: { type: String, default: '' },
    gender: { type: String, default: '' },
    termins: { type: String, default: '' },
    quote: { type: String, default: '' },
    aboutme: { type: String, default: '' },
    lastname: { type: String, default: '' },
    bgImageVersion: { type: String, default: '' },
    bgImageId: { type: String, default: '' },
    privacy: { type: String, default: 'public' },
    lastActive: { type: Date, index: true },  // Agregar índice aquí
  // REFERENCIA
    contactInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactInfo' },
    educationInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationInfo' },  // Añadir referencia a EducationInfo
    jobInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'JobInfo' },  // Añadir referencia a JobInfo


    social: { type: mongoose.Schema.Types.ObjectId, ref: 'Social' },
    featuredFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    friends: { type: [String], default: [] },
    friendsCount: { type: Number, default: 0 },
    reels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reel' }],
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],


} );

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ) {
    delete ret._id;
    delete ret.password;
  },
});



export const UserModel = mongoose.model('User', userSchema);

