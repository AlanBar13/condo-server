import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum AnnouncementTo {
    ALL = 'ALL',
    CONDO = 'CONDO',
    OWNERS = 'OWNERS',
}

@Entity()
export class Announcement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    date: Date;

    @Column()
    postedBy: string;

    @Column({ type: 'enum', enum: AnnouncementTo })
    to: AnnouncementTo;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}
