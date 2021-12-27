const initialState = {
  user: {},
  all: [],
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        user: action.payload,
      }
    case "ALL":
      return {
        ...state,
        all: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
