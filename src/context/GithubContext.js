import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()
const GITHUB_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_APIKEY

export const GithubProvider = ({ children }) => {
  // Initial state that contains an empty array
  const initialState = { users: [], user: {}, repos: [], isLoading: false }
  // Just like useState, useReducer have a dispatch to set the state that is passed into the reducer, in this case, is the initial state
  const [{ users, user, repos, isLoading }, dispatch] = useReducer(
    githubReducer,
    initialState
  )

  // GET INITIAL USERS (FOR TESTING)
  // const fetchUsers = async () => {
  //   setIsLoading()
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   })

  // SEARCH USERS
  const searchUsers = async (text) => {
    setIsLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const { items } = await response.json()
    // After fetch from the API, response is store in data
    // Dispatching by define the type of action and passin the data as payload
    // And in reducer will decide what to do and passback the state
    // Just like the useState the dispatch will up date the state, which now is populated with data that is fetched from the API
    // pass in the data as payload to the reducer and execute the action in the reducer
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
    // set isloading to true
  }

  // SEARCH SINGLE USER
  const getUser = async (login) => {
    setIsLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (response.status === 404) return (window.location = '/notfound')

    const data = await response.json()

    // After fetch from the API, response is store in data
    // Dispatching by define the type of action and passin the data as payload
    // And in reducer will decide what to do and passback the state
    // Just like the useState the dispatch will up date the state, which now is populated with data that is fetched from the API
    // pass in the data as payload to the reducer and execute the action in the reducer
    dispatch({
      type: 'GET_USER',
      payload: data,
    })
    // set isloading to true
  }

  // GET USER REPOS
  const getRepos = async (login) => {
    setIsLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()

    dispatch({ type: 'GET_REPOS', payload: data })
  }

  // CLEAR ALL USERS SEARCH RESULT
  const clearSearch = () => dispatch({ type: 'CLEAR_SEARCH' })

  // HELPER
  const setIsLoading = () => {
    dispatch({ type: 'SET_ISLOADING' })
  }

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        repos,
        isLoading,
        getUser,
        getRepos,
        searchUsers,
        clearSearch,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
