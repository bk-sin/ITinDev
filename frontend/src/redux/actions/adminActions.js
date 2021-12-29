import axios from "axios"
import {toast} from "react-toastify"

const adminAction = {
  setPersonas: (type) => {
    return (dispatch, getState) => {
      const all = getState().authReducer.all
      dispatch({
        type: type === "ASC" ? "ASC" : type === "DES" ? "DES" : "DEFAULT",
        payload: all,
      })
    }
  },
  deletePeople: (id) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token")

      await axios.put(
        "http://localhost:4000/api/admin/deleteUser/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const response = await axios.get("http://localhost:4000/api/users")
      dispatch({
        type: "ALL",
        payload: response.data.response,
      })
    }
  },
}
export default adminAction
