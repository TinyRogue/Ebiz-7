import React, {createContext, type FC} from 'react'
import './App.css'
import paths from "./Routing/paths";
import {Route, Routes, Link as RouterLink, BrowserRouter} from 'react-router-dom';
import {Link} from "@mui/material";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const USER_CART_ID = 1;
export const CartContext = createContext(0)

export const App: FC = () => {
  return (
    <BrowserRouter>
      <CartContext.Provider value={USER_CART_ID}>
        <ToastContainer />
        <div className="App">
          <header className="App-header">
            <Link className="App-link" underline="none" to={paths.Home} component={RouterLink}>Products</Link>
            <Link className="App-link" underline="none" to={paths.Cart} component={RouterLink}>Cart</Link>
          </header>
          <Routes>
            <Route path={paths.Home} Component={Home}/>
            <Route path={paths.Cart} Component={Cart}/>
          </Routes>
        </div>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

App.displayName = 'Ebiz5'

export default App
