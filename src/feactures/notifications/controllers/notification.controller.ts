import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dto/notification.dto';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
    this.createNotification = this.createNotification.bind(this);
    this.getNotificationsByUser = this.getNotificationsByUser.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
  }

  public async createNotification(req: Request, res: Response): Promise<Response> {
    const createNotificationDto: CreateNotificationDto = req.body;
    try {
      const notification = await this.notificationService.createNotification(createNotificationDto);
      return res.status(201).json(notification);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating notification' });
    }
  }

  public async getNotificationsByUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.userId;
    try {
      const notifications = await this.notificationService.getNotificationsByUser(userId);
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching notifications' });
    }
  }

  public async markAsRead(req: Request, res: Response): Promise<Response> {
    const notificationId = req.params.notificationId;
    try {
      const notification = await this.notificationService.markAsRead(notificationId);
      return res.status(200).json(notification);
    } catch (error) {
      return res.status(500).json({ error: 'Error marking notification as read' });
    }
  }

  public async deleteNotification(req: Request, res: Response): Promise<Response> {
    const notificationId = req.params.notificationId;
    try {
      await this.notificationService.deleteNotification(notificationId);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting notification' });
    }
  }
}
