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
    google,
    description
  ) => {
    return async (dispatch, getState) => {
      try {
        let response = await axios.post(
          "https://itindev-mindhub.herokuapp.com/api/auth/signup",
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
            description,
          }
        )
        if (response.data.success && !response.data.error) {
          localStorage.setItem("token", response.data.response.token)
          toast.success(
            "Welcome to ITinDev " + response.data.response.newUser.name
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
          "https://itindev-mindhub.herokuapp.com/api/auth/signin",
          {
            email,
            password,
          }
        )

        if (response.data.success) {
          localStorage.setItem("token", response.data.response.token)
          toast.success("Welcome to ITinDev " + response.data.response.name)

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
          "https://itindev-mindhub.herokuapp.com/api/tokenVerification",

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
  getAllUsers: (id) => {
    return async (dispatch, getState) => {
      let res = await axios.get(
        "https://itindev-mindhub.herokuapp.com/api/users"
      )
      dispatch({
        type: "ALL",
        payload: res.data.respuesta ? res.data.respuesta : null,
      })
    }
  },
  getUsers: (id) => {
    return async (dispatch, getState) => {
      let res = await axios.get(
        "https://itindev-mindhub.herokuapp.com/api/user/nomatchs/" + id
      )

      const filtrado = res.data.respuesta.filter((e) => e._id !== id)
      dispatch({
        type: "ALL",
        payload: res.data.respuesta ? filtrado : null,
      })
    }
  },
  getMatchUsers: (user) => {
    return async (dispatch, getState) => {
      let res = await axios.get(
        "https://itindev-mindhub.herokuapp.com/api/user/matchs/" + user._id
      )

      dispatch({
        type: "TEST",
        payload: res.data.respuesta ? res.data.respuesta : null,
      })
    }
  },

  matchsAndDismatchs: (id) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token")
      try {
        await axios.put(
          "https://itindev-mindhub.herokuapp.com/api/match/" + id,
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
  newConversation: (recieverId) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token")
      try {
        await axios.post(
          "https://itindev-mindhub.herokuapp.com/api/conversations/" +
            recieverId,
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
  getConversation: (id) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          "https://itindev-mindhub.herokuapp.com/api/conversations/" + id
        )
      } catch (error) {
        console.error(error)
      }
    }
  },
}

export default authAction
