import axios from "axios" 

const usersActions = {
    signUp: (newUser) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios.post("http://localhost:4000/api/user/signUp", {...newUser})
                console.log(response.data)
                if (response.data.success){
                    dispatch({type: "LOGGED", payload: response.data.response})
                    
                }else {
                    return response.data.response
                }
            }catch(error){
                

            }
        }
    },
    
    logUser: (logUser) => {
        return async (dispatch, getState) => {
            let response = await axios.post("http://localhost:4000/api/user/logIn", {...logUser})
            if (response.data.success){
                dispatch({type: "LOGGED", payload: response.data.response})   
            }
            return response
        }
    },

    logOut: () => {
        return async (dispatch, getState) => {
            dispatch({type: "LOG_OUT"})
        }
    },

    logInLS: (token) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios.get("http://localhost:4000/api/tokenVerification", {
                headers: {
                    Authorization: "Bearer "+token
                }
                
                 })
                dispatch({type: "LOGGED", payload: {token, firstName: response.data.firstName, src: response.data.src, _id: response.data._id}})
            } catch (error) {
                return dispatch ({type: "LOG_OUT"})
            } 
        }
    }
}

export default usersActions