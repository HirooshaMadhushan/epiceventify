import React from 'react'
import './LayoutPage.css'
//components
import Header from '../../components/Header/Header'

import AdminSideMenu from '../../components/AdminSideMenu/AdminSideMenu'
import { Outlet } from 'react-router-dom'


const LayoutPage = () => {
  return (
    <div className='layout-content'>
      <div className='layout-header'>
        <Header/>
      </div>
      <div className='layout-body'>
          <div className='layout-sidemenu'>
          <AdminSideMenu />
          </div>
          <div className='layout-outlet'>
       
     
         <Outlet/>
        
          </div>
          
      </div>
    </div>
  )
}

export default LayoutPage
