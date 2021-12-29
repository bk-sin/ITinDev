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
}
export default adminAction
