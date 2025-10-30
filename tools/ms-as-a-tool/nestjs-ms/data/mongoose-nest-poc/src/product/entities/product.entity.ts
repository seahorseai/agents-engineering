import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductHydratedDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  
  @Prop()
  name: string;

  @Prop()
  reference: number;

  @Prop()
  price: number;
  private _id: any;

  // Getter for _id
  get id(): string {
    return this._id.toString();
  }
}

export const CatSchema = SchemaFactory.createForClass(Product);
