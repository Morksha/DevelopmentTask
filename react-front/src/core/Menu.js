import React from 'react'
import {Link , withRouter} from 'react-router-dom';

const isActive = (history,path) => {
  if(history.location.pathname === path) return {color:"#ff9900"}
  else return {color:"#ffffff"}
}

export const signout = (next) => {
  if(typeof window !== "undefined" ) localStorage.removeItem("jwt")
  next()
  return fetch("http://localhost:8080/signout",{
    method:"GET"
  })
  .then(response => {
    console.log('signout', response)
    return response.json()
  })
  .catch(err => console.log(err))
}

const Menu = ({history}) =>(
  <div>
  <ul className="nav nav-tabs bg-primary " >
    <li className="nav-item">
      <Link className="nav-link text-white" style={isActive(history,"/")} to="/">HOME</Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link text-white" style={isActive(history,"/signin")} to="/signin">SIGN IN</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" style={isActive(history,"/signup")} to="/signup">SIGN UP</Link>
    </li>
    <li className="nav-item">
      <a className="nav-link text-white"
      style={isActive(history,"/signup"), {curser:"pointer",color:"#ffffff"}}
      onClick= {() => signout(() => history.push('/') )}
      >SIGN OUT</a>
    </li>
  </ul>
  </div>
);



export default withRouter(Menu);
