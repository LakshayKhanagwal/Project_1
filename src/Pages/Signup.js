import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Firebase, { auth } from '../Firebase';

const Signup = () => {

  let [data, setdata] = useState({})
  let [btn_disabler,set_btn_disabler] = useState(false)

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

  async function createAccount(e) {
    try {
      e.preventDefault()

      set_btn_disabler(true)
      
      if (data.Name && data.Email && data.Password && data.Conf_Password) {
        const ack = EmailChange(data.Email)

        if (!ack) return alert("Please Enter a valid Email Address.")

        if (data.Password !== data.Conf_Password) return alert('Password Mismatch. Re-Enter password.')

        if (data.Password.length < 6) return alert('Password Must Be Longer then 6 Characters.')

        const ack_auth = await auth.createUserWithEmailAndPassword(data.Email, data.Password)

        if (!ack_auth) return alert("Some Internal Error Occured.")

        Firebase.child(`users/${ack_auth.user.uid}`).update({ "Name": data.Name, "Email": data.Email }, err => {

          if (err) return alert("Sometihing is Woring. Pleease try again later.")

          setdata({})
          return alert("Account Created Successfully.")
        })

      } else {
        console.log(data)
        alert('Please Fill All Options. All are Mandatory')
      }

    } catch (error) {
      alert("Email Address already exists.")
    }
    finally{
      set_btn_disabler(false)
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
              <input type="email" name='Email' value={data.Email ? data.Email : ""} onChange={set} placeholder="Email Address" />
            </div>
            <div className="form-group">
              <input type="password" name='Password' value={data.Password ? data.Password : ""} onChange={set} placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="password" name='Conf_Password' value={data.Conf_Password ? data.Conf_Password : ""} onChange={set} placeholder="Confirm Password" />
            </div>
            <button type="submit" disabled={btn_disabler} onClick={createAccount} className="btn-two w-100 d-block">Create Account</button>
            <p className="login-text">Already have an account?<Link to={'/Login'}>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup