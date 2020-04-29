import React from 'react'
import styled from '#root/theme'

type As = 'h1' | 'h2' | 'h3' | 'h4'
type TextAlign = 'left' | 'right' | 'center'

type HeadingTagProps = {
  as?: As
  textAlign?: TextAlign
}

const HeadingTag = styled.h1<HeadingTagProps>`
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
  text-align: ${({ textAlign }) => textAlign};
  line-height: ${({ theme }) => theme.fonts.baseLineHeight};
  color: ${({ theme }) => theme.colors.dark};
`

type HeadingProps = HeadingTagProps & {
  type: As
  children: React.ReactChild | React.ReactChild[]
}

export const Heading = ({ children, type, textAlign, ...rest }: HeadingProps) => (
  <HeadingTag {...rest} as={type} textAlign={textAlign}>
    {children}
  </HeadingTag>
)
