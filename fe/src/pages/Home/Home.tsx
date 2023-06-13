import {type FC, useContext, useEffect, useState} from 'react'
import { getProducts } from '../../api/products'
import {Typography} from '@mui/material'
import './Home.css'
import FullLoading from "../../util/FullLoading/FullLoading";
import {toast} from "react-toastify";
import Product from "./Product/Product";
import {type Product as ProductModel} from "../../model/product";
import {addProductToCart} from "../../api/cart";
import {CartContext} from "../../App";

export const Home: FC = () => {
  const cartId = useContext(CartContext);
  const [products, setProducts] = useState<ProductModel[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null)

  const addItem = async (productId: number) => {
    console.log('add item')
    try {
      await addProductToCart(cartId, productId);
      toast.success('Product added to cart')
    } catch (error) {
      toast.error('Could not add product to cart')
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        setLoading(true)
        const products = await getProducts()
        setProducts(products)
        setError(null);
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (error != null) {
    return <>
      <Typography variant="h3">Could not load products</Typography>
      <Typography variant="body1">{error?.name + ': ' + error?.message}</Typography>
    </>
  }

  if (loading) {
    return <FullLoading />
  }

  return (
    <div className="root">
      {products.map((product) => <Product onAddToCart={addItem} key={product.id} category={product.category} id={product.id} name={product.name} price={product.price} description={product.description} />)}
    </div>
  )
}

export default Home
