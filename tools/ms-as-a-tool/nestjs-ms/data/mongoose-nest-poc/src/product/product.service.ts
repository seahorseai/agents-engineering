import { Injectable } from '@nestjs/common';
import { Product, ProductHydratedDocument } from './entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  
  constructor(@InjectModel(Product.name)
              private productModel: Model<ProductHydratedDocument>){}
  
  async create(product: Product): Promise<ProductHydratedDocument> {
    const userCreated: ProductHydratedDocument = await this.productModel.create(product);
    return userCreated;
  }

  // findAll() {
  //   return `This action returns all product`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
