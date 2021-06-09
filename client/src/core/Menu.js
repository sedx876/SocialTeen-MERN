import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import favicon from '../images/favicon.png'

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff9900' };
  else return { color: '#ffffff' };
}

const Menu = ({history}) => (
  <div>
		<nav>
    <div className="nav-wrapper gradient">
      <Link to='/' className="brand-logo black-text left">
			<span><img src={favicon} style={{width: '20px', height: '20px'}}/></span>
				PrideSupport
			</Link>
      <ul id="nav-mobile" className="right">

        <li>
					<Link to='/signin' className='black-text'>
						LogIn
					</Link>
				</li>

        <li>
					<Link to="/signup" className='black-text'>
						Create Account
					</Link>
				</li>

				<li>
        	<Link style={isActive(history, '/users')} to="/users" className='black-text'>
          	Members Directory
        	</Link>
      	</li>

				{isAuthenticated() &&
					<>

						<li>
      				<Link to={`/posts`} style={isActive(history, `/posts`)} className="black-text">
        				Post Feed
      				</Link>
    				</li>

						<li className="nav-item">
      				<Link to={`/post/create`} style={isActive(history, `/post/create`)} className="black-text">
        				Create Post
      				</Link>
    				</li>

						<li>
							<Link className="black-text" to={`/user/${isAuthenticated().user._id}`}
								style={(isActive(history, `/user/${isAuthenticated().user._id}`))}>
								{`${isAuthenticated().user.name} Profile`} 
							</Link>
						</li>

						<li className="nav-item">
							<span
								style={{ cursor: 'pointer', color: '#880e4f', margin: '5px' }} 
								onClick={() => signout(() => history.push('/'))}>
								Log Out 
							</span>
						</li>
					</>
				}

      </ul>
    </div>
  </nav>
  </div>
)

export default withRouter(Menu)