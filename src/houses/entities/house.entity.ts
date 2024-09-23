import { Condo } from 'src/condo/entities/condo.entity';
import { User } from 'src/users/entities/user.entity';
import { Visitant } from 'src/visitant/entities/visitant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Condo, (condo) => condo.houses)
  condo: Condo;

  @Column()
  condoId: number;

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
