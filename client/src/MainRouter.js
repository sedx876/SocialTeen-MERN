import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './core/Menu'
import Footer from './core/Footer'
import Home from './core/Home'
import TOS from './core/TOS'
import Links from './core/Links'


const MainRouter = () => {
  return (
    <div>
			<Menu/>
			<Switch>
			<Route exact path='/' component={Home}/>
			<Route path='/TOS' component={TOS}/>
			<Route path='/links' component={Links}/>
			</Switch>
			<Footer/>
    </div>
    )
}

export default MainRouter