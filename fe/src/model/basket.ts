import {Product} from "./product";

export type Basket = {
    id?: number;
    products?: Omit<Product[], 'category'>;
}