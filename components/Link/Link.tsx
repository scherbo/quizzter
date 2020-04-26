import React from 'react'
import NextLink from 'next/link'
import styled from '#root/theme'

const ATag = styled.a`
  position: relative;
  font-size: ${({ theme }) => theme.fonts.mediumTextSize};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: -3%;
    bottom: -2px;
    width: 106%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primaryLightest};
    transition: 0.3s;
  }

  &:hover {
    &:after {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

type LinkProps = {
  href: string
  prefetch?: boolean
  children: React.ReactChild | React.ReactChild[]
}

export const Link = ({ href, prefetch, children }: LinkProps) => (
  <NextLink href={href} prefetch={prefetch}>
    <ATag>{children}</ATag>
  </NextLink>
)
