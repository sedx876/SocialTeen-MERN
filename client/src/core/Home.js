import React from 'react'
import PrideFist from '../images/PrideFist.jpg'

const Home = () => {
  return (
    
		<div className="row home-card">
    <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-2">
      <div className="card large pink lighten-1">
        <div className="card-image center">
          <img src={PrideFist}/>
        </div>
        <div className="card-content center">
          <p>A supportive social community for LGBTQ Teens.
					</p>
        </div>
        <div className="card-action center">
          <a className='black-text' href="#">Not A Member Yet? SignUp Here!</a>
        </div>
      </div>
    </div>
  </div>

    
  )
}

export default Home
