import { Injectable } from '@nestjs/common';
import { FindOneByFieldDto } from '../dto/find-on-by-field.dto';
import { DataSource, Repository } from 'typeorm';
import { AcountsEntity } from '../entity/acounts.entiti';

@Injectable()
export class AcountsServices {
  private readonly acountsRepo: Repository<AcountsEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.acountsRepo = this.dataSource.getRepository(AcountsEntity);
  }
  async findOneByField(data: FindOneByFieldDto) {
    return await this.acountsRepo.findOne({
      where: data,
    });
  }
}
