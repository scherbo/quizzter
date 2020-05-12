import React from 'react'
import styled from '#root/theme'
import { useDispatch } from 'react-redux'

import { Container, Heading } from '#root/components'
import { updateUser } from '#root/store'
import withProtection from '#root/lib/withProtection'

const ThemeColor = styled.div<{ color: 'light' | 'dark' }>`
  width: 35px;
  height: 35px;
  border-radius: ${({ theme }) => theme.common.borderRadius};
  background-color: ${({ color }) => {
    if (color === 'light') {
      return '#fff'
    }

    return '#342e37'
  }};
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme, color }) => {
    if (theme.colors.background === '#fff') {
      return '#342e37'
    }

    return '#fff'
  }};

  &:not(:last-child) {
    margin-right: 10px;
  }
`

const Profile = () => {
  const dispatch = useDispatch()

  const handleChangeTheme = (theme: 'light' | 'dark') => () => {
    updateUser(dispatch, { theme })
  }

  return (
    <Container css={{ paddingTop: 50 }}>
      <Heading type="h3">Theme color</Heading>
      <div css={{ display: 'flex' }}>
        <ThemeColor color="light" onClick={handleChangeTheme('light')} />
        <ThemeColor color="dark" onClick={handleChangeTheme('dark')} />
      </div>
    </Container>
  )
}

export default withProtection(Profile)
