import React from 'react'
import Link from 'next/link'

import styled from '#root/theme'
import { FlexContainer, Navigation } from '#root/components'

export const Logo = styled.a`
  text-decoration: none;
  font-size: ${({ theme }) => theme.fonts.bigTextSize};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
`

export const HeaderTag = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  display: flex;
  align-items: center;
`

export const Header = () => (
  <HeaderTag>
    <FlexContainer alignItems="center" justifyContent="space-between">
      <Link href="/">
        <Logo>Quizzter</Logo>
      </Link>
      <Navigation />
    </FlexContainer>
  </HeaderTag>
)
