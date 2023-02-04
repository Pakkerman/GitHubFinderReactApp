import { createContext, useContext, useReducer } from 'react'

import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
  // Initial state that contains an empty array
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  }
  // Just like useState, useReducer have a dispatch to set the state that is passed into the reducer, in this case, is the initial state
  const [state, dispatch] = useReducer(githubReducer, initialState)

  // GET INITIAL USERS (FOR TESTING)
  // const fetchUsers = async () => {
  //   setIsLoading()
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   })

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
