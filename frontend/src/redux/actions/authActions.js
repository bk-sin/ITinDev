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
      let res = await axios.get("http://localhost:4000/api/user/nomatchs/" + id)
      dispatch({
        type: "ALL",
        payload: res.data.respuesta ? res.data.respuesta : null,
      })
    }
  },
  getMatchUsers: (user) => {
    return async (dispatch, getState) => {
      let res = await axios.get(
        "http://localhost:4000/api/user/matchs/" + user._id
      )

      const matches = user.matchs.some()

      dispatch({
        type: "TEST",
        payload: res.data.respuesta ? res.data.respuesta : null,
      })
    }
  },
  match: (user, idliked) => {
    return async (dispatch, getState) => {
      console.log(user)
      console.log(idliked)
      if (user.matchs.some((e) => e === idliked)) {
        console.log("Hola")
      } else {
        console.log("no")
      }
    }
  },
  matchsAndDismatchs: (id) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token")
      try {
        await axios.put(
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
  newConversation: (recieverId) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token")
      try {
        await axios.post(
          "http://localhost:4000/api/conversations/" + recieverId,
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
          "http://localhost:4000/api/conversations/" + id
        )
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  },
}

export default authAction
