import React, { Component } from 'react'
import suicide from '../images/suicide.png'
import trevor from '../images/trevor.jpg'
import pflag from '../images/pflag.png'
import theCenter from '../images/theCenter.png'
import timeOut from '../images/timeOut.png'

class Links extends Component{
	render(){
		return(
			<div className='linkContainer center'>

				<div class="row link-card">
    			<div class="pink lighten-2">
      			<div class="card pink lighten-1">
        			<div class="card-content white-text">
          			<span class="card-title black-text">Suicide Prevention</span>
								<div className="card-image center">
								<a href="https://suicidepreventionlifeline.org/" 
									target="_blank" 
									rel="noopener noreferrer">
								<img className='suicide' src={suicide}/>
								</a>
        				</div>
        			</div>
      		</div>
    		</div>
  		</div>

			<div class="row link-card">
    			<div class="pink lighten-2">
      			<div class="card pink lighten-1">
        			<div class="card-content white-text">
          			<span class="card-title black-text">The Trevor Project</span>
								<div className="card-image center">
								<a href="https://www.thetrevorproject.org/" 
									target="_blank" 
									rel="noopener noreferrer">
								<img className='trevor' src={trevor}/>
								</a>
        				</div>
        			</div>
      		</div>
    		</div>
  		</div>

			<div class="row link-card">
    			<div class="pink lighten-2">
      			<div class="card pink lighten-1">
        			<div class="card-content white-text">
          			<span class="card-title black-text">PFlag.Org</span>
								<div className="card-image center">
								<a href="https://pflag.org/" 
									target="_blank" 
									rel="noopener noreferrer">
								<img className='pflag' src={pflag}/>
								</a>
        				</div>
        			</div>
      		</div>
    		</div>
  		</div>

			<div class="row link-card">
    			<div class="pink lighten-2">
      			<div class="card pink lighten-1">
        			<div class="card-content white-text">
          			<span class="card-title black-text">The Center</span>
								<div className="card-image center">
								<a href="https://gaycenter.org/family-youth/youth/" 
									target="_blank" 
									rel="noopener noreferrer">
								<img className='theCenter' src={theCenter}/>
								</a>
        				</div>
        			</div>
      		</div>
    		</div>
  		</div>

			<div class="row link-card">
    			<div class="pink lighten-2">
      			<div class="card pink lighten-1">
        			<div class="card-content white-text">
          			<span class="card-title black-text">Time Out</span>
								<div className="card-image center">
								<a href="https://www.timeoutyouth.org/youth/programs" 
									target="_blank" 
									rel="noopener noreferrer">
								<img className='timeOut' src={timeOut}/>
								</a>
        				</div>
        			</div>
      		</div>
    		</div>
  		</div>

		</div>
		)
	}
}

export default Links