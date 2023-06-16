import { AcountsEntity } from '../../../modules/acounts/entity/acounts.entiti';
import { Column, JoinColumn, OneToOne } from 'typeorm';

export class inheritanceEntity {
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  update_at: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  delete_at: Date;
  @OneToOne(() => AcountsEntity, (acount) => acount.id)
  @JoinColumn()
  create_by: AcountsEntity;
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: false })
  isDelete: boolean;
}
