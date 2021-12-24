import axios from 'axios';
import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux"
import authActions from "../redux/actions/authActions"
import GoogleLogin from 'react-google-login'
import Swal from 'sweetalert2'


const SignUp = (props) => {
    const [countries, setCountries] = useState([])
    const [errorInput, setErrorInput] = useState({})


    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name')
            .then(res => setCountries(res.data))
            .catch(err => console.error(err))
    },[])

    const [newUser, setNewUser] = useState ({
        name: "",
        lastName: "",
        country: "",
        email: "",
        url: "",
        password: "",
    })

    const inputHandler = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
            
        })
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

    const responseGoogle = (response) => {
        let googleUser = {
            name: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            password: response.profileObj.googleId,
            email: response.profileObj.email,
            url: response.profileObj.imageUrl,
            country: "Undefined",
            google: true,
        }
        props.signUp(googleUser)
        .then((response) => {
            if (response.data.success){
                Toast.fire({
                    icon: 'success',
                    title: 'Your account has been created!'
                })
            }
            else{
            setErrorInput(response.data.response)
            }
        })
        .catch((error) => {
            console.log(error)
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong! Come back later!'
            })
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        let info = Object.values(newUser).some((infoUser) => infoUser === "")
        if (info) {
            Toast.fire({
                icon: 'error',
                title: 'There are fields incomplete, please complete them.'
            })
        } else {
            props.signUp(newUser)
        .then((response) => {
            if (response.data.success){
                Toast.fire({
                    icon: 'success',
                    title: 'Your account has been created!'
                })
            } else if (response.data.errors){
                setErrorInput({})
                response.data.errors.map(error => setErrorInput(messageError => {
                        return {
                            ...messageError, 
                        [error.path]: error.message,
                        }
                    })  
                )
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'That email has already been used! Try with another one.'
                })
            }
        })        
        .catch((error) => {
            console.log(error)
            Toast.fire({
                icon: 'error',
                title: 'We are having technical difficulties! Come back later!'
                })
            })
        }
    }


    return (
        <div className="cointainer-all">
                <div className="form-neon">
                    <form action="" method="">
                        <div className="inputs-container">
                            <h2>Register account 🚀</h2>
                            <label htmlFor="name">Name:</label>
                                <input type="text" name="name" id="name" onChange={inputHandler}/>
                                <p className='text-danger'>{errorInput.name}</p>
                            <label htmlFor="lastName">Last Name:</label>
                                <input type="text" name="lastName" id="lastName" onChange={inputHandler}/>
                                <p className='text-danger'>{errorInput.lastName}</p>                 
                            <div className="select-container">
                                <p>Country:</p>
                                <select name="country" id="country-select" onChange={inputHandler}>
                                    <option defaultValue value="Choose one">Choose one</option>
                                    {countries.map(country => <option key={country.name} value={country.name}>{country.name}</option>)}
                                </select>
                            </div>
                            <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" onChange={inputHandler} />
                                <p className='text-danger'>{errorInput.email}</p>   
                            <label htmlFor="url">URL Photo:</label>
                                <input type="url" name="url" id="url" onChange={inputHandler} />
                                <p className='text-danger'>{errorInput.url}</p>   
                            <label htmlFor="password">Password:</label>
                                <input type="password" name="password" id="password" onChange={inputHandler} />
                                <p className='text-danger'>{errorInput.password}</p>   
                            <div className="ppal-btn">
                                <Link to="/" className="btn-form" onClick={(e) => submitForm(e)}>
                                    Sign Up
                                </Link>
                                <Link to={"/"}>
                                <GoogleLogin
                                    clientId="364580156359-glg6vkvjvnag4e7ldm36478tge8h4qft.apps.googleusercontent.com"
                                    buttonText="Sign Up with Goolge"
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
                                <p>Already have an account?</p>
                                <Link as={Link} to="/signIn" className="btn-form">
                                    Sign In
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
    signUp: authActions.signUp
}

export default connect (mapStateToProps, mapDispatchToProps)(SignUp)