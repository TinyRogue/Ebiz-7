import axios from 'axios'
import { type Product } from '../model/product'
import { PUBLIC_URL } from './const'

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${PUBLIC_URL}/products`)
  return response.data
}

export const getProduct = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`${PUBLIC_URL}/products/${id}`)
  return response.data
}
