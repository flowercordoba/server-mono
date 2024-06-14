/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError } from '@globals/helpers/custom.error';

export class UserEntity {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public country: string,
    public profilePicture?: string,
    public img?: string,
    public postsCount?: number,
    public followersCount?: number,
    public followingCount?: number,
    public blocked?: any[],
    public blockedBy?: any[],
    public work?: string,
    public school?: string,
    public location?: string,
    public birthday?: string,
    public gender?: string,
    public termins?: string,
    public quote?: string,
    public aboutme?: string,
    public lastname?: string,
    public bgImageVersion?: string,
    public bgImageId?: string,
    public privacy?: string,
    public lastActive?: Date,
    public featuredFriends?: any[],
    public savedPosts?: any[],
    public friends?: any[],
    public friendsCount?: number,
    public reels?: any[],
    public stories?: any[],
    public imagesId?: any[],
    public notifications?: any[],
    public posts?: any[],
  ) { }

  static fromObject(object: { [key: string]: any; }) {
    const {
      id, _id, username, email, emailValidated, password, role, country, profilePicture, img,
      postsCount, followersCount, followingCount, blocked, blockedBy, work, school, location,
      birthday, gender, termins, quote, aboutme, lastname, bgImageVersion, bgImageId, privacy,
      lastActive, featuredFriends, savedPosts, friends, friendsCount, reels, stories, imagesId,
      notifications, posts
    } = object;

    if (!_id && !id) {
      throw CustomError.badRequest('Missing id');
    }

    if (!username) throw CustomError.badRequest('Missing username');
    if (!email) throw CustomError.badRequest('Missing email');
    if (emailValidated === undefined) throw CustomError.badRequest('Missing emailValidated');
    if (!password) throw CustomError.badRequest('Missing password');
    if (!role) throw CustomError.badRequest('Missing role');
    if (!country) throw CustomError.badRequest('Missing country');

    return new UserEntity(
      _id || id, username, email, emailValidated, password, role, country, profilePicture, img,
      postsCount, followersCount, followingCount, blocked, blockedBy, work, school, location,
      birthday, gender, termins, quote, aboutme, lastname, bgImageVersion, bgImageId, privacy,
      lastActive, featuredFriends, savedPosts, friends, friendsCount, reels, stories, imagesId,
      notifications, posts
    );
  }
}
