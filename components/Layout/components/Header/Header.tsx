import React from 'react'
import Link from 'next/link'

import styled from '#root/theme'
import { Container } from '#root/components'

import { Navigation } from './components'

export const Logo = styled.a`
  text-decoration: none;
  font-size: ${({ theme }) => theme.fonts.bigTextSize};
  color: ${({ theme }) => theme.colors.textMain};
  cursor: pointer;
`

export const HeaderTag = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  display: flex;
  align-items: center;
`

export const Header = () => (
  <HeaderTag>
    <Container display="flex" alignItems="center" justifyContent="space-between">
      <Link href="/">
        <Logo>Quizzter</Logo>
      </Link>
      <Navigation />
    </Container>
  </HeaderTag>
)
