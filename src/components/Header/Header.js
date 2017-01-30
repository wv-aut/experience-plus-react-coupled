import React from 'react'
// import { IndexLink, Link } from 'react-router'
import './Header.scss'
import Logo from './assets/logo-worldvision.svg'

export const Header = () => (
  <header className='right'>
    <img
      alt='World Vision Logo'
      src={Logo} />
  </header>
)

export default Header
