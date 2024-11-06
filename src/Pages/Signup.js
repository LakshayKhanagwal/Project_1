import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="login-wrap">
  <div className="login-bg">
    <a  className="navbar-brand">
      <img className="logo-light" src="assets/img/logo-white.webp" alt="Image" />
      <img className="logo-dark" src="assets/img/logo-white.webp" alt="Image" />
    </a>
  </div>
  <div className="login-content">
    <Link to={'/'} className="link-one"><i className="ri-arrow-left-s-line" />Back</Link>
    <div className="login-form">
      <h3>Account SignUp</h3>
      <div className="alt-login">
        <a style={{width:"100%"}} href="https://www.gmail.com/"><img src="assets/img/icons/google.svg" alt="Image" />Login With
          Google</a>    
      </div>
      <div className="text-center">
        <span className="or-text">OR</span>
      </div>
      <form action="#">
        <div className="form-group">
          <input type="text" placeholder="Full Name" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password" />
        </div>
        <button type="submit" className="btn-two w-100 d-block">Create Account</button>
        <p className="login-text">Already have an account?<a href="login.html">Login</a></p>
      </form>
    </div>
  </div>
    </div>
  )
}

export default Signup