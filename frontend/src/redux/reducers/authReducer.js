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
        auxiliar: action.payload,
      }
<<<<<<< HEAD
=======
    case "ASC":
      return {
        ...state,
        auxiliar: state.all.sort(function (b, a) {
          return a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        }),
      }
    case "DES":
      return {
        ...state,
        auxiliar: state.all.sort(function (a, b) {
          return a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        }),
      }
    case "DEFAULT":
      return {
        ...state,
        auxiliar: action.payload,
      }
>>>>>>> 840de9b9bd51b3a59be51497a2cdf72c3b2b9d80
    default:
      return state
  }
}

export default authReducer
