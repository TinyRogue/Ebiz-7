import React, {type FC, useContext, useEffect, useState} from 'react'
import {getCart, pay, removeProductFromCart} from "../../api/cart";
import {CartContext} from "../../App";
import {Button, Divider, IconButton, Typography} from "@mui/material";
import FullLoading from "../../util/FullLoading/FullLoading";
import {Basket} from "../../model/basket";
import {DeleteForever} from "@mui/icons-material";
import {toast} from "react-toastify";

export const Cart: FC = () => {
  const cartId = useContext(CartContext);
  const [cart, setCart] = useState<Basket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null)
  const [refechCart, setRefetchCart] = useState<boolean>(false)

  const removeItem = async (productId: number) => {
    try {
      await removeProductFromCart(cartId, productId);
      setCart({
        ...cart,
        products: cart?.products?.filter(product => product.id !== productId) ?? []
      });
    } catch (err) {
      toast.error('Could not remove product from cart')
      return
    }
  }

  useEffect(() => {
    void (async () => {
      setLoading(true)
      try {
        const cart = await getCart(cartId);
        setCart(cart);
        setError(null);
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
        setRefetchCart(false)
      }
    })()
  }, [cartId, refechCart])


  if (error != null) {
    return <>
      <Typography variant="h3">Could not load cart of yours</Typography>
      <Typography variant="body1">{error?.name + ': ' + error?.message}</Typography>
    </>
  }

  if (loading) {
    return <FullLoading />
  }

  const submitPayment = async () => {
    if (cart?.products?.length === 0) {
        toast.error('Your cart is empty')
        return
    }

    try {
      await pay(cartId)
      setRefetchCart(true)
    } catch (err) {
        toast.error('Could not send payment')
        return
    }
    toast.success('Payment sent – Your cart is now empty and your items are coming to you soon. Thank you for your purchase.')
  }

  return <>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
      <Typography variant="h6">Name</Typography>
      <Typography variant="h6" sx={{marginRight: 5}}>Price</Typography>
    </div>
    {cart?.products?.map((product) => <div key={product.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Typography sx={{alignSelf: 'center'}} variant="body1">{product.name}</Typography>
      <div style={{display: 'flex'}}>
        <Typography sx={{alignSelf: 'center'}} variant="body1">{product.price}</Typography>
        <IconButton style={{ color: '#BF616A'}} onClick={() => removeItem(product.id)}><DeleteForever /></IconButton>
      </div>
    </div>)
    }
    <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Typography variant="h6" sx={{marginRight: 5}}>Total</Typography>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Typography variant="h6" sx={{marginRight: 5}}> {cart?.products?.map(product => product.price).reduce((price, current) => (price ?? 0) + (current ?? 0), 0)}</Typography>
    </div>
    <Button onClick={submitPayment} variant="contained" sx={{width: 300, marginLeft: 'auto', marginRight: 'auto', marginTop: 12, background: '#88C0D0', color: '#2E3440'}}>Prześlij dane do płatności</Button>
  </>
}

export default Cart
