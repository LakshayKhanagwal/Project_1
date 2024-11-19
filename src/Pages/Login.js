import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Firebase, { auth } from '../Firebase'

const Login = () => {

    let [creds, set_creds] = useState({})

    let [btn_disabler, set_btn_disabler] = useState(false)

    let navigate = useNavigate()

    function EmailChange(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email)
    }

    function set(e) {
        set_creds({ ...creds, [e.target.name]: e.target.value })
    }
    console.log(creds)

    async function Signin(e) {
        try {
            e.preventDefault()

            set_btn_disabler(true)

            if (creds.Email && creds.Password) {
                const ack = EmailChange(creds.Email)

                if (!ack) return alert("Please Enter a valid Email Address.")

                const ack_auth = await auth.signInWithEmailAndPassword(creds.Email, creds.Password)

                if (!ack_auth) return alert("Some Internal Error Occured.")

                localStorage.setItem("Usrs", JSON.stringify(ack_auth.user.uid))
                set_creds({})
                navigate("/AdminBlogDetail")
            }

            else {
                alert("All Fields Are Mendetory.")
            }

        } catch (error) {
            alert("Wrong Credentials.")
        }
        finally {
            set_btn_disabler(false)
        }
    }

    return (
        <div className="login-wrap">
            <div className="login-bg">
                <a href="index.html" className="navbar-brand">
                    <img className="logo-light" src="assets/img/logo-white.webp" alt="Image" />
                    <img className="logo-dark" src="assets/img/logo-white.webp" alt="Image" />
                </a>
            </div>
            <div className="login-content">
                <Link to={'/'} className="link-one"><i className="ri-arrow-left-s-line" />Back</Link>
                <div className="login-form">
                    <h3>Welcome Back</h3>
                    <div className="alt-login">
                        <a style={{ width: "100%" }} href="https://www.gmail.com/"><img src="assets/img/icons/google.svg" alt="Image" />Login With
                            Google</a>
                    </div>
                    <div className="text-center">
                        <span className="or-text">OR</span>
                    </div>
                    <form action="#">
                        <div className="form-group">
                            <input type="email" name='Email' onChange={set} value={creds.Email ? creds.Email : ""} placeholder="Email Address" />
                        </div>
                        <div className="form-group">
                            <input type="number" name='Password' onChange={set} value={creds.Password ? creds.Password : ""} placeholder="Password" />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-check checkbox">
                                    <input className="form-check-input" type="checkbox" id="test_2" />
                                    <label className="form-check-label" htmlFor="test_2">
                                        Stay Logged In?
                                    </label>
                                </div>
                            </div>
                            <div className="col-6 text-end">
                                <a href="login.html">Forgot Password</a>
                            </div>
                        </div>
                        <button type="submit" onClick={Signin} disabled={btn_disabler} className="btn-two w-100 d-block">Login</button>
                        <p className="login-text">Don't have an account?<Link to={'/Signup'}>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login