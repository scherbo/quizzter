import styled from '#root/theme'

export const Paragraph = styled.p<{ size?: 'md' | 'lg' }>`
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
  color: ${({ theme }) => theme.colors.gray4};
`
