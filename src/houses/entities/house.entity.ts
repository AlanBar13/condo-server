import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class House {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    condo: string

    @Column()
    number: number

    @Column({ default: false })
    address: string

    @OneToMany(() => User, (user) => user.house)
    habitants: User[]

    @CreateDateColumn({ type: 'timestamptz'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz'})
    updatedAt: Date
}
