import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequest } from './dto/create-product-request.dto';
import { CreateProductResponse } from './dto/create-product-response.dto';
import { Product, ProductHydratedDocument } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Post()
async create(@Body() createProductRequest: CreateProductRequest): Promise<CreateProductResponse> {
  try {
    let product: Product = new Product();
    product.name = createProductRequest.name;
    product.price = createProductRequest.price;
    product.reference = createProductRequest.reference;

    let productHydratedDocument: ProductHydratedDocument = await this.productService.create(product);
    let productCreated: Product = productHydratedDocument;

    let createProductResponse: CreateProductResponse = new CreateProductResponse();
    createProductResponse.id = productCreated.id;
    createProductResponse.name = productCreated.name;
    createProductResponse.price = productCreated.price;
    createProductResponse.reference = productCreated.reference;

    return createProductResponse;
  } catch (error) {
    // Add appropriate error response, e.g., throw a custom exception or return a meaningful message
    throw new Error(`Failed to create product: ${error.message}`);
  }
}


}
