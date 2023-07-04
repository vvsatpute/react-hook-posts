import React, { useEffect } from 'react'
import queryString from 'query-string'
import { fetchItem, fetchPosts, fetchComments } from '../utils/api'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'

const postReducer = (state, action) => {
  if (action.type === 'fetchPost') {
    return {
      ...state,
      loadingPost: false,
      post: action.post
    }
  } else if (action.type === 'fetchComments') {
    return {
      ...state,
      loadingComments: false,
      comments: action.comments
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      loadingComments: false,
      loadingPost: false,
      error: action.message
    }
  } else {
    throw new Error('No such action type found')
  }
}

export default function Post({ location }) {

  const { id } = queryString.parse(location.search)

  const [state, dispatch] = React.useReducer(postReducer, {
    post: null,
    loadingPost: true,
    comments: null,
    loadingComments: true,
    error: null,
  })

  useEffect(() => {

    fetchItem(id)
      .then((post) => {
        dispatch({ type: 'fetchPost', post })
        return fetchComments(post.kids || [])
      })
      .then((comments) => {
        dispatch({ type: 'fetchComments', comments })
      }).catch(({ message }) => {
        dispatch({ type: 'error', message })
      })
  }, [id]);

  const { post, loadingPost, comments, loadingComments, error } = state;

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return (
    <React.Fragment>
      {loadingPost === true
        ? <Loading text='Fetching post' />
        : <React.Fragment>
          <h1 className='header'>
            <Title url={post.url} title={post.title} id={post.id} />
          </h1>
          <PostMetaInfo
            by={post.by}
            time={post.time}
            id={post.id}
            descendants={post.descendants}
          />
          <p dangerouslySetInnerHTML={{ __html: post.text }} />
        </React.Fragment>}
      {loadingComments === true
        ? loadingPost === false && <Loading text='Fetching comments' />
        : <React.Fragment>
          {comments.map((comment) =>
            <Comment
              key={comment.id}
              comment={comment}
            />
          )}
        </React.Fragment>}
    </React.Fragment>
  )
}