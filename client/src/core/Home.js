import React from 'react'
import PrideFist from '../images/PrideFist.jpg'

const Home = () => {
  return (
    
		<div class="row home-card">
    <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-2">
      <div class="card large pink lighten-1">
        <div class="card-image center">
          <img src={PrideFist}/>
        </div>
        <div class="card-content center">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action center">
          <a className='black-text' href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>

    
  )
}

export default Home
