const githubReducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_USERS':
      return { ...state, users: payload, isLoading: false }
    case 'GET_USER':
      return { ...state, user: payload, isLoading: false }
    case 'GET_REPOS':
      return { ...state, repos: payload, isLoading: false }
    case 'SET_ISLOADING':
      return { ...state, isLoading: true }
    case 'CLEAR_SEARCH':
      return { ...state, users: [] }
    default:
      return state
  }
}

export default githubReducer
