export interface CreateFriendDto {
    userId: string;
    friendId: string;
    status?: 'pending' | 'accepted' | 'rejected';
  }
  
  export interface FriendDto {
    id: string;
    userId: string;
    friendId: string;
    status: string;
    createdAt: Date;
  }
  