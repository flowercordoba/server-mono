export interface CreateNotificationDto {
  userId: string;
  message: string;
  type: 'friend-request' | 'friend-accept' | 'mention' | 'share';
}

export interface NotificationDto {
  id: string;
  userId: string;
  message: string;
  type: string;
  createdAt: Date;
}
