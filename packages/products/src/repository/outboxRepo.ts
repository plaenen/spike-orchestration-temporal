import { EntityRepository, Repository } from "typeorm";
import { Outbox } from "../entities/outbox";


@EntityRepository(Outbox)
export class OutboxRepository extends Repository<Outbox> {}
