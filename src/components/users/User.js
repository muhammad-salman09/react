import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';

const User = ({ loading, user, repos, getUser, getUserRepos, match }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    login,
    name,
    avatar_url,
    html_url,
    company,
    location,
    hireable,
    email,
    bio,
    public_repos,
    public_gists,
    followers,
    following
  } = user;
  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt="not found"
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>{location && <Fragment>location:{location}</Fragment>}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio} </p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>{login && <Fragment>username:{login}</Fragment>}</li>
            <li>{company && <Fragment>company: {company}</Fragment>}</li>
            <li>{email && <Fragment>email: {email}</Fragment>}</li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary"> Folowers: {followers} </div>
        <div className="badge badge-success"> Following: {following} </div>
        <div className="badge badge-light"> Repositeries: {public_repos} </div>
        <div className="badge badge-dark"> Public Gists: {public_gists} </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};
User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  Repos: PropTypes.array.isRequired
};
export default User;
