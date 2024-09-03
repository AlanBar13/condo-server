import { House } from 'src/houses/entities/house.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column({ default: false })
    isOwner: boolean

    @ManyToOne(() => House, (house) => house.habitants)
    house: House

    @CreateDateColumn({ type: 'timestamptz'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz'})
    updatedAt: Date
}
