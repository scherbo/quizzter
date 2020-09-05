import React from 'react'
import styled from '#root/theme'

type TextTagProps = {
  size?: 'md' | 'lg'
  color?: 'main' | 'secondary' | 'other'
  weight?: 'bold' | 'normal'
}

export const TextTag = styled.span<TextTagProps>`
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
  line-height: ${({ theme }) => theme.fonts.baseLineHeight};
  color: ${({ theme, color }) => {
    switch (color) {
      case 'main':
        return theme.colors.textMain
      case 'secondary':
        return theme.colors.textSecondary
      default:
        return theme.colors.textOther
    }
  }};
  font-weight: ${({ weight }) => {
    switch (weight) {
      case 'bold':
        return 600
      default:
        return 300
    }
  }};
  transition: 0.5s;
`

type TextProps = TextTagProps & {
  children: React.ReactChild | React.ReactChild[]
}

export const Text = ({ size, weight, children, ...rest }: TextProps) => (
  <TextTag {...rest} size={size} weight={weight}>
    {children}
  </TextTag>
)
