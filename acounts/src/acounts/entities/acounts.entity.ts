import { CountryCodesEnum } from './../../core/enums/country-codes.enum';
import { inheritanceEntity } from 'src/core/databases/inheritance/inheritance.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as brcynt from 'bcrypt';
@Entity('acounts')
export class AcountsEntity extends inheritanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 255, nullable: false })
  fullname: string;
  @Column({
    unique: true,
    length: 255,
    nullable: false,
  })
  email: string;
  @Column({
    unique: true,
    nullable: false,
  })
  phone: string;
  @Column({
    nullable: false,
  })
  address: string;
  @Column({
    type: 'enum',
    enum: CountryCodesEnum,
    default: CountryCodesEnum.Vietnam,
  })
  country: CountryCodesEnum;
  @Column({ nullable: true })
  facebook: string;
  @Column({ nullable: true })
  google: string;
  @Column({
    length: 30,
    unique: true,
    nullable: false,
  })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false })
  hash: string;
  @Column({ default: false })
  isAdmin: boolean;
  @Column({ nullable: true })
  avatar: string;
  @Column({ nullable: true })
  background: string;
  @BeforeInsert()
  public async hashPassword() {
    const hashRound = brcynt.genSaltSync(10);
    this.password = brcynt.hashSync(this.password, hashRound);
    this.hash = hashRound;
  }
  @BeforeUpdate()
  public async checkAndHash() {
    const hashRound = brcynt.genSaltSync(10);
    if (this.password) {
      this.password = brcynt.hashSync(this.password, hashRound);
      this.hash = hashRound;
    }
  }
}
