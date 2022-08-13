import React from 'react'
import {Link , withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from "../auth";

const isActive = (history,path) => {
  if(history.location.pathname === path) return {color:"#ff9900"}
  else return {color:"#ffffff"}
}


const Menu = ({history}) =>(
  <div>
  <ul className="nav nav-tabs bg-primary " >
    <li className="nav-item">
      <Link className="nav-link text-white" style={isActive(history,"/")} to="/">HOME</Link>
    </li>

  {! isAuthenticated() && (
    <>
    <li className="nav-item">
    <Link className="nav-link text-white" style={isActive(history,"/signin")} to="/signin">SIGN IN</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" style={isActive(history,"/signup")} to="/signup">SIGN UP</Link>
    </li>
    </>
  )}

{isAuthenticated() && (
  <>
  <li className="nav-item">
    <a className="nav-link text-white"
    style={isActive(history,"/signup"), {curser:"pointer",color:"#ffffff"}}
    onClick= {() => signout(() => history.push('/') )}
    >SIGN OUT</a>
  </li>

  <li className="nav-item">
  <Link to={`/user/${isAuthenticated().user._id}`} style={{color:"#ffffff"}}>
    <a className="nav-link text-white">{`${isAuthenticated().user.name}'s Profile`}</a>
    </Link>
  </li>
    </>

)}

  </ul>
  </div>

);



export default withRouter(Menu);
