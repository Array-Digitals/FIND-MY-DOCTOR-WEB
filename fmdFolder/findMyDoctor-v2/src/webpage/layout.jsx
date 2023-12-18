import React, {useState, useEffect} from 'react'
import Header  from './Component/header'
import { Outlet} from 'react-router-dom'
import { Footer } from './Component/footer'

export const Layout = () => {

  // const [username, setUserName] = useState('');

  return (
    <>
        <Header />
        <Outlet/>
        <Footer/>

    </>
  )
}
