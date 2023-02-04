import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_APIKEY || ''

//TODO: Handle if the limit reached, show error

// SET AUTHORIZATION HEADER IF APIKEY EXIST; ELSE USE NO API
const headers = {}
if (GITHUB_TOKEN !== '') headers.Authorization = `token ${GITHUB_TOKEN}`

// AXIOS INSTANCE
const githubInstance = axios.create({
  baseURL: GITHUB_URL,
  headers: headers,
})

// SEARCH USERS
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text })

  const response = await githubInstance.get(`/search/users?${params}`)

  // console.log(response.status)
  // if (response.status === 401) {
  //   console.log(response.data.message)
  //   window.location = '/ErrorPage'
  // }

  // GET RESET LIMIT TIME
  const timestamp = response.headers['x-ratelimit-reset']
  const date = new Date(+timestamp * 1000)
  const formattedDate = date.toLocaleString()

  console.log(`Call limit will be reset at: ${formattedDate}`)

  // console.log(response.headers)
  return response.data.items
}

// GET USER AND REPOS
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    githubInstance.get(`/users/${login}`),
    githubInstance.get(`/users/${login}/repos`),
  ])

  console.log(
    user.headers['x-ratelimit-remaining'],
    repos.headers['x-ratelimit-remaining']
  )

  return { user: user.data, repos: repos.data }
}
