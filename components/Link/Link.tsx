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
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primaryLightest};
    width: 0;
    transition: 0.3s;
  }

  &:hover {
    &:after {
      width: 106%;
    }
  }
`

type LinkProps = {
  href: string
  children: React.ReactChild | React.ReactChild[]
}

export const Link = ({ href, children }: LinkProps) => (
  <NextLink href={href}>
    <ATag>{children}</ATag>
  </NextLink>
)
