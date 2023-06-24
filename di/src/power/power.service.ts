import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  supplyPower(watts: number) {
    console.log(`Supplying ${watts} Watts of power`);
  }
}
