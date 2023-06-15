import { inheritanceEntity } from './../databases/inheritance/inheritance.entity';
import { AcountsEntity } from 'src/acounts/entities/acounts.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ACTION_ENUM } from '../enums/role.enum';
import { ENITIES_ENUM } from '../enums/entities.enum';

@Entity('roles')
export class RolesEntity extends inheritanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => AcountsEntity, (acount) => acount.id)
  @JoinColumn()
  acount: AcountsEntity;
  @Column({ enum: ACTION_ENUM, type: 'enum', nullable: false })
  action: ACTION_ENUM;
  @Column({ type: 'enum', enum: ENITIES_ENUM, nullable: false })
  entity: ENITIES_ENUM;
}
