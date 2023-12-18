import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from './Component/header'
import { Footer } from './Component/footer'
export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  )
}
