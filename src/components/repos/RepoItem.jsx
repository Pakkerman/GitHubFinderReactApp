import { FaEye, FaInfo, FaLink, FaStar } from 'react-icons/fa'
import { TbGitFork } from 'react-icons/tb'

import PropTypes from 'prop-types'

function RepoItem({ repo }) {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
  } = repo

  return (
    <div className="mb-2 rounded-md card bg-gray-800 hover:bg-gray-900">
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <a href={html_url} rel="noreferrer" target="_blank">
            <FaLink className="inline mr-1" />
            {name}
          </a>
          <p className="mb-3 opacity-80">
            {description ? description : 'No Description'}
          </p>
          <div>
            <div className="mr-2 badge badge-info badge-lg">
              <FaEye className="mr-2" />
              {watchers_count}
            </div>
            <div className="mr-2 badge badge-success badge-lg">
              <FaStar className="mr-2" />
              {stargazers_count}
            </div>
            <div className="mr-2 badge badge-error badge-lg">
              <FaInfo className="mr-2" />
              {open_issues}
            </div>
            <div className="mr-2 badge badge-warning badge-lg">
              <TbGitFork className="mr-2" />
              {forks}
            </div>
          </div>
        </h3>
      </div>
    </div>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
}

export default RepoItem
