import axios from "axios"
import {toast} from "react-toastify"

const authAction = {
  signupUser: (
    name,
    lastName,
    country,
    email,
    age,
    password,
    gender,
    image,
    google
  ) => {
    return async (dispatch, getState) => {
      try {
        let response = await axios.post(
          "http://localhost:4000/api/auth/signup",
          {
            name,
            lastName,
            country,
            email,
            age,
            password,
            gender,
            image,
            google,
          }
        )
        if (response.data.success && !response.data.error) {
          localStorage.setItem("token", response.data.response.token)
          toast.success(
            "Welcome to MyTinerary " + response.data.response.newUser.name
          )
          dispatch({
            type: "USER",
            payload: response.data.response,
          })
        } else {
          toast.error(response.data.errors)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  signinUser: (email, password) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/signin",
          {
            email,
            password,
          }
        )

        if (response.data.success) {
          localStorage.setItem("token", response.data.response.token)
          toast.success("Welcome to MyTinerary " + response.data.response.name)

          dispatch({
            type: "USER",
            payload: response.data.response,
          })
        } else {
          toast.error(response.data.error)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  tokenDale: () => {
    return async (dispatch, getState) => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(
          "http://localhost:4000/api/tokenVerification",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        dispatch({
          type: "USER",
          payload: response.data,
        })
      } catch (error) {}
    }
  },
  signOut: () => {
    localStorage.removeItem("token")
    return (dispatch, getState) => {
      dispatch({type: "SIGN_OUT", payload: ""})
    }
  },
  getUsers: () => {
    return async (dispatch, getState) => {
      let res = await axios.get("http://localhost:4000/api/users")
      dispatch({
        type: "ALL",
        payload: res.data.respuesta,
      })
    }
  },
}

export default authAction
