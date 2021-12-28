const usersReducers = (state= {token: null, firstName: null, src: null, _id: null}, action) => {
    switch(action.type){
        case "LOGGED": 
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("name", action.payload.firstName)
            localStorage.setItem("src", action.payload.src)
            localStorage.setItem("_id", action.payload._id)
            console.log(action.payload)
            return {
                token: action.payload.token, 
                firstName: action.payload.firstName,
                src: action.payload.src,
                _id: action.payload._id
            }
        case "LOG_OUT":
            localStorage.removeItem("token")
            localStorage.removeItem("name")
            localStorage.removeItem("src")
            localStorage.removeItem("_id")
            return {
                token: null,
                firstName: null, 
                src: null,
                _id: null,
            }
        default: 
        return (
            state
        )
    }
}

export default usersReducers