import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import favicon from '../images/favicon.png'

const Menu = () => (
  <div>
		<nav>
    <div className="nav-wrapper gradient">
      <a href="#" className="brand-logo black-text left">
			<span><img src={favicon} style={{width: '20px', height: '20px'}}/></span>
				PrideSupport</a>
      <ul id="nav-mobile" className="right">
        <li><a className='black-text' href="sass.html">LogIn</a></li>
        <li><a className='black-text' href="badges.html">Create Account</a></li>
        <li><a className='black-text' href="collapsible.html">Create Post</a></li>
				<li><a className='black-text' href="collapsible.html">LogOut</a></li>
      </ul>
    </div>
  </nav>
  </div>
)

export default Menu