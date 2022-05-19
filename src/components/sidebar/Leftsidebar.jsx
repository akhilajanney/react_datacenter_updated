import React, { Component } from 'react'
import sidebar from'./sidebar.css'
import { Link } from 'react-router-dom';

export default class Leftsidebar extends Component {
  logout=()=>{
       console.log('logout----');
        sessionStorage.removeItem('isLogged')
            window.location.pathname='/login'
}
  render() {
    return (
      <div>
          <div className='sidebar'>
                <img src="/images/vacuslogo.png" alt="" style={{width:'45px',marginTop:'15px'}}/>

                <Link to='/home'>
                <div className='sidebarmenu' title="Home" >
                <i style={{fontSize:'22px',color:'#000',paddingTop:'9px'}} className="fas fa-home-alt"></i>
                </div>
                </Link>

                <Link to='/config'>
                <div className='sidebarmenu' title="Configuration">
                <i style={{fontSize:'22px',color:'#000',paddingTop:'9px'}}className="fas fa-cog"></i>    
                </div>
                </Link>
                
                <Link to='/realtime'>
                <div className='sidebarmenu' title="Real-time Tracking" >
                <i style={{fontSize:'22px',color:'#000',paddingTop:'9px'}} className="fas fa-map-marker-alt"></i>
                </div>
                </Link>

                <Link to='/health'>
                <div className='sidebarmenu' title="Health">
                    <i style={{fontSize:'22px',color:'#000',paddingTop:'10px'}}className="fas fa-heartbeat"></i>
                </div>
                </Link>


                <Link to='/alerts'>
                <div className='sidebarmenu' title="Alerts">
                <i style={{fontSize:'22px',color:'#000',paddingTop:'8px',paddingLeft:'5px',transform:'rotate(30deg)'}} className="fas fa-bell"></i>
                </div>
                </Link>

                <Link to='/assetdetails'>
                <div className='sidebarmenu' title="Asset Details">
                <i style={{fontSize:'22px',color:'#000',paddingTop:'9px'}} className="fas fa-server"></i>
                </div>
                </Link>

                <div className='sidebarmenu'style={{marginTop:'55px'}} title="Logout"  onClick={this.logout}>
                <i style={{fontSize:'22px',color:'#FF5454',paddingTop:'9px',marginLeft:'-3px',transform:'rotate(180deg)',marginTop:'8px'}} className="fas fa-sign-out-alt"></i>
                </div>
          </div>
      </div>
    )
  }
}
