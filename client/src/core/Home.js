import React from 'react'
import PrideFist from '../images/PrideFist.jpg'

const Home = () => {
  return (
    
		<div class="row home-card">
    <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
      <div class="card large">
        <div class="card-image center">
          <img src={PrideFist}/>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>

    
  )
}

export default Home
