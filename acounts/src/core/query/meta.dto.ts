import { IsNotEmpty } from 'class-validator';
class MetaDto {
  @IsNotEmpty()
  page: number;
  @IsNotEmpty()
  take: number;
  @IsNotEmpty()
  total: number;
}
export class Meta {
  private page: number;
  private take: number;
  private next: boolean;
  private back: boolean;
  private total: number;
  private totalPage: number;
  constructor(data: MetaDto) {
    this.page = data.page;
    this.take = data.take;
    this.total = data.total;
    this.totalPage = Math.ceil(this.total / this.take);
    this.next = this.page < this.totalPage;
    this.back = this.back > this.next;
  }
}
