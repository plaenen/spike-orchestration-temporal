import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/product";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findById(productId: string) {
    return this.createQueryBuilder("products")
      .where("products.id = :fullname", { productId })
      .getOne();
  }
}
