import { Document } from 'mongoose';
import { CreateFriendDto, FriendDto } from '../dto/FriendDto';
import { Friend, IFriend } from '../models/friend.scheme';
import { UserModel } from '@root/feactures/user/models/user.model';
import { IReport, ReportModel } from '@root/feactures/report/models/report.schemes';
import { IUser } from '@root/feactures/user/interfaces/user.interface';


export class FriendService {
  public async createFriendRequest(createFriendDto: CreateFriendDto): Promise<FriendDto> {
    const friendRequest = new Friend({
      ...createFriendDto,
      status: 'pending'
    });
    await friendRequest.save();
    return this.toFriendDto(friendRequest);
  }

  public async acceptFriendRequest(requestId: string): Promise<FriendDto | null> {
    const friendRequest = await Friend.findByIdAndUpdate(
      requestId,
      { status: 'accepted' },
      { new: true }
    );
    return friendRequest ? this.toFriendDto(friendRequest as Document & IFriend) : null;
  }

  public async rejectFriendRequest(requestId: string): Promise<FriendDto | null> {
    const friendRequest = await Friend.findByIdAndUpdate(
      requestId,
      { status: 'rejected' },
      { new: true }
    );
    return friendRequest ? this.toFriendDto(friendRequest as Document & IFriend) : null;
  }

  public async getFriends(userId: string): Promise<FriendDto[]> {
    const friends = await Friend.find({ userId, status: 'accepted' }).exec();
    return friends.map((friend: Document & IFriend) => this.toFriendDto(friend));
  }



// Método para obtener amigos
public async getFriend(userId: string): Promise<IUser[]> {
    try {
      const user = await UserModel.findById(userId).populate('friends').exec();
      return user ? (user.friends as IUser[]) : [];
    } catch (error) {
      console.error('Error fetching friends:', error);
      throw new Error('Error fetching friends');
    }
  }

  public async getFriendDetails(userId: string, friendId: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(userId).populate('friends').exec();
      if (user) {
        const friend = user.friends.find(friend => friend._id.toString() === friendId);
        return friend ? friend : null;
      }
      return null;
    } catch (error) {
      console.error('Error fetching friend details:', error);
      throw new Error('Error fetching friend details');
    }
  }


  public async followUser(userId: string, friendId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $addToSet: { following: friendId } }).exec();
    await UserModel.findByIdAndUpdate(friendId, { $addToSet: { followers: userId } }).exec();
  }

  public async blockUser(userId: string, blockId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $addToSet: { blocked: blockId } }).exec();
    await UserModel.findByIdAndUpdate(blockId, { $addToSet: { blockedBy: userId } }).exec();
  }

  public async unfollowUser(userId: string, friendId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $pull: { following: friendId } }).exec();
    await UserModel.findByIdAndUpdate(friendId, { $pull: { followers: userId } }).exec();
  }

  public async reportUser(userId: string, reportId: string, reason: string): Promise<IReport> {
    const report = new ReportModel({
      userId,
      reportedUserId: reportId,
      reason
    });
    await report.save();
    return report;
  }

  private toFriendDto(friend: Document & IFriend): FriendDto {
    return {
      id: friend._id.toString(),
      userId: friend.userId.toString(),
      friendId: friend.friendId.toString(),
      status: friend.status,
      createdAt: friend.createdAt
    };
  }
}
