import React from 'react'
import { useSelector } from 'react-redux'
import styled from '#root/theme'

import { RootState } from '#root/store'
import { setCookies } from '#root/utils'

import { NavLink, ATag } from './NavLink'

export const NavList = styled.ul`
  display: flex;
`

export const NavListItem = styled.li`
  &:not(:last-child) {
    margin-right: 15px;
  }
`

const NAVIGATION = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Sign In',
    href: '/signin',
  },
]

const AUTHENTICATED_NAVIGATION = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Builder',
    href: '/builder',
  },
  {
    text: 'Profile',
    href: '/profile',
  },
]

export const Navigation = () => {
  const authenticated = useSelector<RootState, boolean>((s) => s.session.authenticated)

  const handleLogout = () => {
    setCookies({ key: 'token', value: null })
    location.assign('/')
  }

  return (
    <nav>
      <NavList>
        {(authenticated ? AUTHENTICATED_NAVIGATION : NAVIGATION).map(({ text, href }) => (
          <NavListItem key={text}>
            <NavLink href={href}>{text}</NavLink>
          </NavListItem>
        ))}
        {authenticated && (
          <ATag isActive={false} onClick={handleLogout}>
            Logout
          </ATag>
        )}
      </NavList>
    </nav>
  )
}
