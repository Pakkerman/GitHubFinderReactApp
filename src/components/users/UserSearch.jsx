import { useState, useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import GithubContext from '../../context/GithubContext'

function UserSearch() {
  const [text, setText] = useState('')
  const { users, searchUsers, clearSearch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)
  // HANDLE SEARCH BOX TEXT CHANGE
  const handleChange = ({ target: { value } }) => setText(value)

  // HANDLE FORM SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault()
    if (text === '') {
      setAlert('Please Enter Something to Search', 'error')
    } else {
      searchUsers(text)

      setText('')
    }
  }

  // CLEAR SEARCH RESULT
  const handleClear = () => {
    clearSearch()
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-col-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="search"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={handleClear} className="btn btn-ghost btn-large">
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch

// import { useState, useContext } from 'react'
// import GithubContext from '../../context/GithubContext'

// function UserSearch() {
//   const [text, setText] = useState('')

//   const { users } = useContext(GithubContext)

//   const handleChange = ({ target: { value } }) => setText(value)

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     // Reject if serach param is empty
//     if (text === '') return alert('please enter something to search')
//     // TODO: SEARCH USERS
//     setText('')
//   }

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md: grid-cols-2 mb-8 gap-8">
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div className="form-control">
//             <div className="relative">
//               <input
//                 type="text"
//                 className="w-full pr-40 bg-gray-200 input input-lg text-black"
//                 value={text}
//                 onChange={handleChange}
//                 placeholder="Search Users"
//               />
//               <button
//                 type="submit"
//                 className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
//               >
//                 Go
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//       {users.length > 0 && (
//         <div>
//           <button className="btn btn-ghost btn-lg">Clear</button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default UserSearch
