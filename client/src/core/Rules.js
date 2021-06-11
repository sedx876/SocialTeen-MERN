import React, {Component} from 'react'
import side from '../images/side.jpg'
import { Link } from 'react-router-dom'


class Rules extends Component{

    render(){
        return(
					<>
					<div class="col s12 m7" style={{margin: '5px'}}>
    				<h2 class="header center darkPink">Rules of Respect and Support</h2>
    			<div class="card horizontal large">
      		<div class="card-image">
        		<img src={side}/>
      		</div>
      		<div class="card-stacked">
        		<div class="card-content pink lighten-2">
          		<p className='darkPink'
								style={{fontSize: '15px'}}>
								Hello,
							</p>
							<p className='darkPink'
								style={{fontSize: '15px'}}>
								We are happy and excited you found us here at PrideSupport.
								PrideSupport strives to provide a safe and supportive space
								for LGBTQ+ Youth. PrideSupport recognizes not all LGBTQ+ 
								Youth live within a nurturing and supportive environment.
							</p>
        		</div>
        	<div className="center darkPink pink lighten-2">
          <Link to='/' className='darkPink'>Home</Link>
        </div>
      </div>
    </div>
  </div>
					</>
        )
    }
}

export default Rules