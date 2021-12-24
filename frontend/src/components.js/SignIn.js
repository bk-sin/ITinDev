import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import authActions from '../redux/actions/authActions';
import GoogleLogin from 'react-google-login'
import Swal from 'sweetalert2';


const SignIn = (props) => {
    const [errorInput, setErrorInput] = useState({})


    const [signUser, setSignUser] = useState ({
        email: "", 
        password: "",
    })

    const inputHandler = (e) => {
        setSignUser({
            ...signUser, 
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        let info = Object.values(signUser).some((infoUser) => infoUser === "")
        if (info) {
            Toast.fire({
                icon: 'error',
                title: 'There are fields incomplete, please complete them.'
            })
        } else {
            props.signIn(signUser)
        .then((response) => {
            if (!response.data.success){
                Toast.fire({
                    icon: 'error',
                    title: 'Email and/or password incorrect'
                })
                // alert(response.data.response)
            } else {
                Toast.fire({
                    icon: 'success',
                    title: 'Welcome back!'
                })
            }
        })        
        .catch((error) => Toast.fire({
                icon: 'error',
                title: 'Email and/or password incorrect'
            })
        )
        }
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const responseGoogle = (res) => {
        let googleUser = {
            email: res.profileObj.email, 
            password: res.profileObj.googleId,
            google: true,
        }
        props.signIn(googleUser)
        .then((response) => {
            if (response.data.success){
                Toast.fire({
                    icon: 'success',
                    title: "It's good to see you again! 😄"
                })
            }else{
            setErrorInput(response.data.response)
            }
        })
        .catch((error) => {
            console.log(error)
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong!'
            })
        })
    }

    return (
        <div className="cointainer-all">
                <div className="form-neon">
                    <form>
                        <div className="inputs-container">
                        <h2>Hello!</h2>
                            <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" onChange={inputHandler}/>
                            <label htmlFor="password">Password:</label>
                                <input type="password" name="password" id="password" onChange={inputHandler} />
                            <div className="ppal-btn">
                                <Link onClick={submitForm} to="/" className="btn-form" type="submit">
                                    Log In
                                </Link>
                                <Link to="" >
                                <GoogleLogin
                                    clientId="364580156359-glg6vkvjvnag4e7ldm36478tge8h4qft.apps.googleusercontent.com"
                                    buttonText="Sign In with Goolge"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                                </Link>
                            </div>
                        </div>
                        <div className="btns-container">
                            <p>explore the world with <b>Mytineraries</b></p>
                            <Link to="/" className="logo-form">
                                <img src="/logo-mt.png" alt="MyTinerary Logo"></img>
                            </Link>
                            <div className="signUp">
                                <p>Don't have an account?</p>
                                <Link as={Link} to="/signUp" className="btn-form">
                                    Sign Up
                                </Link>
                                
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        name: state.authReducer.name
    }
}

const mapDispatchToProps = {
    signIn: authActions.signIn
}


export default connect (mapStateToProps, mapDispatchToProps)(SignIn)