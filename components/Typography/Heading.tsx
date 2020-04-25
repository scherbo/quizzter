import React from 'react'
import styled from '#root/theme'

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4'

const HeadingTag = styled.h1<{ as: HeadingType }>`
  font-size: ${({ theme, as }) => {
    switch (as) {
      case 'h1':
        return theme.fonts.h1Size
      case 'h2':
        return theme.fonts.h2Size
      case 'h3':
        return theme.fonts.h3Size
      default:
        return theme.fonts.h4Size
    }
  }};
  line-height: ${({ theme }) => theme.fonts.baseLineHeight};
  color: ${({ theme }) => theme.colors.dark};
`

type HeadingProps = {
  children: React.ReactChild | React.ReactChild[]
  type: HeadingType
}

export const Heading = ({ children, type, ...rest }: HeadingProps) => (
  <HeadingTag {...rest} as={type}>
    {children}
  </HeadingTag>
)
