import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext.tsx';
import './Navbar.css';


export default function Navbar() {

  const pages = [
    {
      name: 'Notes',
      path: '/dashboard'
    },
    {
      name: 'Account',
      path: '/account'
    }
  ]

  const accountOptions = useRef<OverlayPanel>(null);
  const [currentPageName, setCurrentPageName] = useState(pages[0]) 
  const { setIsLoggedIn } = useContext(LoginContext)
  const navigation = useNavigate()
  const navigateTo = (path: string) => {
    navigation(path)
    setCurrentPageName(pages.find(page => page.path === path)!)
  }
  return (
    <div className='navbar-menu'> 
      <div className='main-navbar-items'>
        {pages.map((page, index) => {
        return (
          <button
            className={'navbar-menu-item' + (currentPageName.name === page.name ? ' navbar-menu-item-selected' : '')} 
            key={index} 
            onClick={()=>{navigateTo(page.path)}} 
            style={{cursor: 'pointer'}}
          >{page.name}</button> 
        )
      })}
      </div>
      <Avatar label='?' className='account-avatar' onClick={(e) => accountOptions.current?.toggle(e)}/>
      <OverlayPanel ref={accountOptions}> 
        <div className='account-options'>
          <Button label='Signup' className='account-option' onClick={()=>{navigateTo('/account')}}/>
          <Button label='Log Out' className='account-option' onClick={()=>{
            navigateTo('/login');
            setIsLoggedIn(false);
            }}/>
        </div>
      </OverlayPanel>
    </div>
  )
}
