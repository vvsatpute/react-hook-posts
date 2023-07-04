import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../contexts/theme'

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav({ toggleTheme }) {

  const theme = useContext(ThemeContext);

  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink
            to='/'
            exact
            activeStyle={activeStyle}
            className='nav-link'>
            Top
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/new'
            activeStyle={activeStyle}
            className='nav-link'>
            New
          </NavLink>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        className='btn-clear'
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  )
}