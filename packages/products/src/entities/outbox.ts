import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn } from "typeorm";
import * as z from 'zod'

@Entity({ name: "outbox" })
export class Outbox {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({ name: "aggregate_type" })
  aggregateType!: string;

  @Column({ name: "aggregate_id" })
  aggregateId!: string;

  @Column({ name: "event_type" })
  eventType!: string;

  @Column({ name: "payload" })
  payload!: string;

  @Column({ name: "idempotency_key", unique: true })
  idempotencyKey!: string

  @Column({ name: "processed_at", nullable: true })
  processedAt!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;
}