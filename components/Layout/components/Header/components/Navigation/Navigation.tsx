import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { LIGHT, DARK } from '#root/theme'

import { RootState, changeTheme } from '#root/store'
import { setCookies } from '#root/utils'

import { NavLink, ATag } from './NavLink'

export const NavTag = styled.nav`
  display: flex;
  align-items: center;
`

export const NavList = styled.ul`
  display: flex;
`

export const NavListItem = styled.li`
  &:not(:last-child) {
    margin-right: 15px;
  }
`

const ThemeColor = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${({ theme }) => {
    return theme.name === 'lightTheme' ? DARK : LIGHT
  }};

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
  const theme = useSelector<RootState, string>((s) => s.theme)
  const dispatch = useDispatch()

  const handleLogout = () => {
    setCookies({ key: 'token', value: null })
    location.assign('/')
  }

  const handleChangeTheme = () => {
    changeTheme(dispatch, theme === 'light' ? 'dark' : 'light')
  }

  return (
    <NavTag>
      <ThemeColor onClick={handleChangeTheme} />
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
    </NavTag>
  )
}
