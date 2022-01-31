import { Entity, PrimaryColumn, Column } from "typeorm";
import * as z from 'zod'

@Entity({ name: "products" })
export class Product {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "customer_id" })
  customerId!: string;

  @Column({ name: "product_code" })
  productCode!: string;

  @Column({ name: "product_status" })
  productStatus!: string;

  @Column({ name: "product_risk_score" })
  productRiskScore!: number;

  @Column({ name: "created_at", default: new Date() })
  createdAt?: Date;
}