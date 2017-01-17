import React from 'react'
// import { IndexLink, Link } from 'react-router'
import './Header.css'
import Logo from './assets/logo-worldvision.svg'

export const Header = () => (
  <header>
    <img
      alt='World Vision Logo'
      className='duck'
      src={Logo} />
  </header>
)

export default Header
