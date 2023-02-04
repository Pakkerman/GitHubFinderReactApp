import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_APIKEY
// const GITHUB_TOKEN = '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1'

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
})

// SEARCH USERS
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text })

  const response = await github.get(`/search/users?${params}`)

  if (response.status === 401) {
    const { message } = await response.json()
    window.location = '/ErrorPage'
  }

  return response.data.items

  // ERROR CHECKING
  // After fetch from the API, response is store in data
  // Dispatching by define the type of action and passin the data as payload
  // And in reducer will decide what to do and passback the state
  // Just like the useState the dispatch will up date the state, which now is populated with data that is fetched from the API
  // pass in the data as payload to the reducer and execute the action in the reducer

  // set isloading to true
}

// GET USER AND REPOS
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}
