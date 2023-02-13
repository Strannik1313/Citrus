import { Master } from '@models/master';
import { Service } from '@models/service';
import { Client } from '@models/client';

export interface Order {
  master: Master;
  service: Service;
  date: Date;
  client: Client | null;
  comments: string | null;
}
