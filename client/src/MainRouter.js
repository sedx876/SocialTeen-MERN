import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './core/Menu'
import Footer from './core/Footer'


const MainRouter = () => {
  return (
    <div>
			<Menu/>
			<Switch>

			</Switch>
			<Footer/>
    </div>
    )
}

export default MainRouter