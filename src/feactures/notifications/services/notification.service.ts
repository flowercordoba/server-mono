import { Document } from 'mongoose';
import { INotification, Notification } from '../models/notification.model';
import { CreateNotificationDto, NotificationDto } from '../dto/notification.dto';

export class NotificationService {
  public async createNotification(createNotificationDto: CreateNotificationDto): Promise<NotificationDto> {
    const notification = new Notification(createNotificationDto);
    await notification.save();
    return this.toNotificationDto(notification);
  }

  public async getNotificationsByUser(userId: string): Promise<NotificationDto[]> {
    const notifications = await Notification.find({ userId }).exec();
    return notifications.map((notification: Document & INotification) => this.toNotificationDto(notification));
  }
  public async markAsRead(notificationId: string): Promise<NotificationDto | null> {
    const notification = await Notification.findByIdAndUpdate(notificationId, { $set: { read: true } }, { new: true });
    return notification ? this.toNotificationDto(notification as Document & INotification) : null;
  }

  public async deleteNotification(notificationId: string): Promise<void> {
    await Notification.findByIdAndDelete(notificationId);
  }


  private toNotificationDto(notification: Document & INotification): NotificationDto {
    return {
      id: notification._id.toString(),
      userId: notification.userId.toString(),
      message: notification.message,
      type: notification.type,
      createdAt: notification.createdAt
    };
  }
}
