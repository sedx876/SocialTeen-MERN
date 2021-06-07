import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './core/Menu'
import Footer from './core/Footer'
import Home from './core/Home'


const MainRouter = () => {
  return (
    <div>
			<Menu/>
			<Switch>
			<Route exact path='/' component={Home}/>
			</Switch>
			<Footer/>
    </div>
    )
}

export default MainRouter