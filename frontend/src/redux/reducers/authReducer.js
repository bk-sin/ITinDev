const initialState = {
  user: [],
  all: "",
  auxiliar: [],
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
    case "SEARCH":
      const filtered = action.payload.all.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(action.payload.search.toLowerCase()) ||
          user.lastName
            .toLowerCase()
            .includes(action.payload.search.toLowerCase())
      )
      return {
        ...state,
        auxiliar: filtered,
      }
    default:
      return state
  }
}

export default authReducer
