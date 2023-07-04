import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'


function postsReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      posts: action.posts,
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.message,
      loading: false
    }
  } else {
    throw new Error('No such action type found!');
  }
}

export default function Posts({ type }) {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    fetchMainPosts(type)
      .then((posts) => dispatch({ type: 'success', posts }))
      .catch(({ message }) => dispatch({ type: 'error', message }));
  }, [type]);

  const { posts, error, loading } = state

  if (loading === true) {
    return <Loading />
  }

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return <PostsList posts={posts} />
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}