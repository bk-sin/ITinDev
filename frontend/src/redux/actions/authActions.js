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
      dispatch({type: "USER", payload: ""})
    }
  },
  getUsers: (id) => {
    return async (dispatch, getState) => {
      let res = await axios.get("http://localhost:4000/api/users")

      const noLikeados = res.data.respuesta.filter(
        (like) => like._id !== id && like.matchs.length > 0
      )

      const filtrado = noLikeados.filter((user) =>
        user.matchs.some((dentro) => dentro._id === id)
      )

      /* const cortado = nolikeados.filter(acortar => acortar === ) */
      console.log(noLikeados)
      dispatch({
        type: "ALL",
        payload: res.data.respuesta,
      })
    }
  },
  matchsAndDismatchs: (id) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token")
      console.log(id)
      try {
        const response = await axios.put(
          "http://localhost:4000/api/match/" + id,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.error(error)
      }
    }
  },
}

export default authAction
