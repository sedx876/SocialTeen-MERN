import React from 'react'
import favicon from '../images/favicon.png'


const Footer = () => {

  return(
    // <footer className="footer gradient black-text">
    //   <p>&copy;2021  PrideSupport </p>
    // </footer>

    <footer class="page-footer gradient">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="black-text">
            	<span><img src={favicon} style={{width: '20px', height: '20px'}}/></span>
              PrideSupport
						</h5>
            <p className="black-text">You can use rows and columns here to organize your footer content.</p>
          </div>
            <div className="col l4 s12">
              <h5 className="black-text">Links</h5>
              	<ul>
                  <li><a className='black-text' href="#!">Terms of Service</a></li>
                  <li><a className='black-text' href="#!">About</a></li>
                  <li><a className='black-text' href="#!">External Links</a></li>
                </ul>
            </div>
          </div>
        </div>
          <div className="footer-copyright black-text">
            <div className="container">
            © 2021 PrideSupport
            <a className="black-text right" href="#!">More Links</a>
            </div>
          </div>
    </footer>
  )
}

export default Footer