import React from 'react'
import styled from '#root/theme'

type ParagraphTagProps = {
  size?: 'md' | 'lg'
  textAlign?: 'left' | 'right' | 'center'
}

export const ParagraphTag = styled.p<ParagraphTagProps>`
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'md':
        return theme.fonts.mediumTextSize
      case 'lg':
        return theme.fonts.bigTextSize
      default:
        return theme.fonts.baseSize
    }
  }};
  text-align: ${({ textAlign }) => textAlign};
  line-height: ${({ theme }) => theme.fonts.baseLineHeight};
  color: ${({ theme }) => theme.colors.gray4};
`

type ParagraphProps = ParagraphTagProps & {
  children: React.ReactChild | React.ReactChild[]
}

export const Paragraph = ({ size, textAlign, children, ...rest }: ParagraphProps) => (
  <ParagraphTag {...rest} size={size} textAlign={textAlign}>
    {children}
  </ParagraphTag>
)
