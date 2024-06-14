import { Request, Response } from 'express';
import { FriendService } from '../services/friend.service';
import { CreateFriendDto } from '../dto/FriendDto';

export class FriendController {
  private friendService: FriendService;

  constructor() {
    this.friendService = new FriendService();
    this.createFriendRequest = this.createFriendRequest.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.rejectFriendRequest = this.rejectFriendRequest.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.getFriend = this.getFriend.bind(this);

    // 
    this.getFriendDetails = this.getFriendDetails.bind(this);
    this.followUser = this.followUser.bind(this);
    this.blockUser = this.blockUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.reportUser = this.reportUser.bind(this);
  }

  public async createFriendRequest(req: Request, res: Response): Promise<Response> {
    const createFriendDto: CreateFriendDto = req.body;
    try {
      const friendRequest = await this.friendService.createFriendRequest(createFriendDto);
      return res.status(201).json(friendRequest);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating friend request' });
    }
  }

  public async acceptFriendRequest(req: Request, res: Response): Promise<Response> {
    const requestId = req.params.requestId;
    try {
      const friendRequest = await this.friendService.acceptFriendRequest(requestId);
      return res.status(200).json(friendRequest);
    } catch (error) {
      return res.status(500).json({ error: 'Error accepting friend request' });
    }
  }

  public async rejectFriendRequest(req: Request, res: Response): Promise<Response> {
    const requestId = req.params.requestId;
    try {
      const friendRequest = await this.friendService.rejectFriendRequest(requestId);
      return res.status(200).json(friendRequest);
    } catch (error) {
      return res.status(500).json({ error: 'Error rejecting friend request' });
    }
  }

  public async getFriends(req: Request, res: Response): Promise<Response> {
    const userId = req.params.userId;
    try {
      const friends = await this.friendService.getFriends(userId);
      return res.status(200).json(friends);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching friends' });
    }
  }

  public async getFriend(req: Request, res: Response): Promise<Response> {
    const userId = req.params.userId;
    try {
      const friends = await this.friendService.getFriend(userId);
      return res.status(200).json(friends);
    } catch (error) {
        console.log(error);
      return res.status(500).json({ error: 'Error fetching friends' });
    }
  }

  public async getFriendDetails(req: Request, res: Response): Promise<Response> {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    try {
      const friend = await this.friendService.getFriendDetails(userId, friendId);
      if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
      }
      return res.status(200).json(friend);
    } catch (error) {
      console.error('Error fetching friend details:', error);
      return res.status(500).json({ error: 'Error fetching friend details' });
    }
  }

  public async followUser(req: Request, res: Response): Promise<Response> {
    const userId = req.body.userId;
    const friendId = req.body.friendId;

    try {
      await this.friendService.followUser(userId, friendId);
      return res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
      console.error('Error following user:', error);
      return res.status(500).json({ error: 'Error following user' });
    }
  }

  public async blockUser(req: Request, res: Response): Promise<Response> {
    const userId = req.body.userId;
    const blockId = req.body.blockId;

    try {
      await this.friendService.blockUser(userId, blockId);
      return res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
      console.error('Error blocking user:', error);
      return res.status(500).json({ error: 'Error blocking user' });
    }
  }

  public async unfollowUser(req: Request, res: Response): Promise<Response> {
    const userId = req.body.userId;
    const friendId = req.body.friendId;

    try {
      await this.friendService.unfollowUser(userId, friendId);
      return res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return res.status(500).json({ error: 'Error unfollowing user' });
    }
  }

  public async reportUser(req: Request, res: Response): Promise<Response> {
    const userId = req.body.userId;
    const reportId = req.body.reportId;
    const reason = req.body.reason;

    try {
      const report = await this.friendService.reportUser(userId, reportId, reason);
      return res.status(200).json({ message: 'User reported successfully', report });
    } catch (error) {
      console.error('Error reporting user:', error);
      return res.status(500).json({ error: 'Error reporting user' });
    }
  }


}
