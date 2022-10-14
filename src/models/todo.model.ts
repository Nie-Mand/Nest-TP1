import { Status } from 'src/@types/enums';
import { CoreEntity } from './core.model';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: string;
}
