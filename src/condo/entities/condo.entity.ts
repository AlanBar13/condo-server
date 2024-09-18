import { House } from "src/houses/entities/house.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Condo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    NHouses: number

    @Column({ nullable: true })
    address: string

    @OneToMany(() => House, (house) => house.condo)
    houses: House[]

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}
