import { ApiProperty } from "@nestjs/swagger";

export class AcceptNotificationDTO {
    @ApiProperty()
    readonly deviceType: string;
    
    @ApiProperty()
    readonly notificationToken: string;
}

export class NotificationDTO {
    @ApiProperty({ description: "Id of the user to send the notification"})
    readonly userIds: number[];
  
    @ApiProperty({ description: "Title of the notification"})
    readonly title: string;
    
    @ApiProperty({ description: "Body of the notification"})
    readonly body: string;

    @ApiProperty({ description: "Icon of the notification"})
    readonly icon: string;
}

export class TopicNotificationDTO {
    @ApiProperty({ description: "Title of the notification"})
    readonly title: string;
    
    @ApiProperty({ description: "Body of the notification"})
    readonly body: string;

    @ApiProperty({ description: "Topic of the notification", nullable: true })
    readonly topic: string;
}