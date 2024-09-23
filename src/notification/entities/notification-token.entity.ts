import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export enum NotificationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class NotificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column()
  deviceType: string;

  @Column()
  notificationToken: string;

  @Column({ type: 'enum', enum: NotificationStatus, default: 'active' })
  status: NotificationStatus;
}
