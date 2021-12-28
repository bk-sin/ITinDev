const initialState = {
  user: [],
  all: "",
  test: [],
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

    case "TEST":
      return {
        ...state,
        test: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
