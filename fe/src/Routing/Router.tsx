import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import React from 'react'
import paths from "./paths";

export const router = createBrowserRouter([
  {
    path: paths.Home,
    element: <Home/>,
    children: [
      {
        path: paths.Cart,
        element: <Cart/>
      }
    ]
  },
])

export default router
