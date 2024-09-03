import { User } from 'src/users/entities/user.entity';
import { Visitant } from 'src/visitant/entities/visitant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  condo: string;

  @Column()
  number: number;

  @Column()
  address: string;

  @OneToMany(() => User, (user) => user.house)
  habitants: User[];

  @OneToMany(() => Visitant, (visitant) => visitant.house)
  visitantRequest: Visitant[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
