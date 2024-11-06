import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

  let [data, setdata] = useState({})

  function NameChange(event) {
    const name = event.target.value.replace(/[^a-zA-Z\s]/g, '');
    setdata({ ...data, [event.target.name]: name });
  }

  function EmailChange(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email)
  }


  function set(e) {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  function createAccount(e) {
    e.preventDefault()
    if (data.Name && data.Email && data.Password && data.Conf_Password) {
      const ack = EmailChange(data.Email)
      if (!ack) return alert("Please Enter a valid Email Address.")

      if (data.Password !== data.Conf_Password) return alert('Password Mismatch. Re-Enter password.')

        console.log(data)

    } else {

    }
  }

  return (
    <div className="login-wrap">
      <div className="login-bg">
        <a className="navbar-brand">
          <img className="logo-light" src="assets/img/logo-white.webp" alt="Image" />
          <img className="logo-dark" src="assets/img/logo-white.webp" alt="Image" />
        </a>
      </div>
      <div className="login-content">
        <Link to={'/'} className="link-one"><i className="ri-arrow-left-s-line" />Back</Link>
        <div className="login-form">
          <h3>Account SignUp</h3>
          <div className="alt-login">
            <a style={{ width: "100%" }} href="https://www.gmail.com/"><img src="assets/img/icons/google.svg" alt="Image" />Login With
              Google</a>
          </div>
          <div className="text-center">
            <span className="or-text">OR</span>
          </div>
          <form action="#">
            <div className="form-group">
              <input type="text" name='Name' value={data.Name ? data.Name : ""} onChange={NameChange} placeholder="Full Name" />
            </div>
            <div className="form-group">
              <input type="email" name='Email' onChange={set} placeholder="Email Address" />
            </div>
            <div className="form-group">
              <input type="password" name='Password' onChange={set} placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="password" name='Conf_Password' onChange={set} placeholder="Confirm Password" />
            </div>
            <button type="submit" onClick={createAccount} className="btn-two w-100 d-block">Create Account</button>
            <p className="login-text">Already have an account?<Link to={'/Login'}>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup