import { Service } from 'nestgram';
import { AcountsEntity } from 'src/acounts/entities/acounts.entity';
import { DataSource, Repository } from 'typeorm';
@Service()
export class TelegramBotCommandService {
  private readonly acountRepo: Repository<AcountsEntity>;
  constructor(private readonly dataSource: DataSource) {}
  start() {
    return 'Hello fen';
  }
  async getAcountToday() {}
}
