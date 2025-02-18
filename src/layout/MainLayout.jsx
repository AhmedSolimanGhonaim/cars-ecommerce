import React from 'react'
import { Admin } from '../components/Admin'
import { Header } from '../components/Header'
import { Home } from '../pages/Home'
import { Products } from '../pages/products'
import { ProductDetails } from '../pages/ProductDetails'

export  function MainLayout() {
  return (
      <div>
          {/* <Admin/> */}
      <Header />
      <ProductDetails/>
      {/* <Home /> */}
      {/* <Products/> */}
    </div>
  )
}
