import axios from "axios"
import {toast} from "react-toastify"

const authAction = {
  signupUser: (
    email,
    password,
    name,
    lastname,
    photo,
    country,
    gender,
    google
  ) => {
    return async (dispatch, getState) => {
      try {
        let response = await axios.post(
          "http://localhost:4000/api/auth/signup",
          {
            email,
            password,
            name,
            lastname,
            photo,
            country,
            gender,
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
          localStorage.setItem("token", response.data.response[0].token)
          toast.success(
            "Welcome to MyTinerary " + response.data.response[0].name
          )

          dispatch({
            type: "USER",
            payload: response.data.response[0],
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
          "http://localhost:4000/api/auth",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        dispatch({
          type: "TOKEN",
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
