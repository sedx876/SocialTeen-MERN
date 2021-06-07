import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Menu = () => (
  <div>
		<nav>
    <div className="nav-wrapper gradient">
      <a href="#" className="brand-logo black-text left">PrideSupport</a>
      <ul id="nav-mobile" className="right">
        <li><a className='black-text' href="sass.html">Sass</a></li>
        <li><a className='black-text' href="badges.html">Components</a></li>
        <li><a className='black-text' href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  </nav>
  </div>
)

export default Menu