import React from 'react'
import NextLink from 'next/link'
import styled from '#root/theme'

const ATag = styled.a<{ size?: 'sm' | 'md' | 'lg' }>`
  position: relative;
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'sm':
        return theme.fonts.smallTextSize
      case 'md':
        return theme.fonts.baseSize
      case 'lg':
        return theme.fonts.mediumTextSize
      default:
        return theme.fonts.baseSize
    }
  }};
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
    transition: 0.5s;
  }

  &:hover {
    &:after {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

type LinkProps = {
  as?: string
  href: string
  prefetch?: boolean
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename'
  children: React.ReactChild | React.ReactChild[]
}

export const Link = ({ href, as, prefetch, size, external, target, children }: LinkProps) =>
  external ? (
    <ATag href={href} size={size} target={target}>
      {children}
    </ATag>
  ) : (
    <NextLink href={href} as={as} prefetch={prefetch}>
      <ATag size={size}>{children}</ATag>
    </NextLink>
  )
