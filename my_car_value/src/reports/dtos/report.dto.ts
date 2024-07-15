import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportsDto {
  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  modal: string;

  @Expose()
  year: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
