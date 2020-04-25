import styled, { CreateStyled } from '@emotion/styled'
import { FONT_SIZE } from '#root/constants'

export const theme = {
  colors: {
    primary: '#3185FC',
    danger: '#ff6464',
    pale: '#f5eaea',
    gray1: '#f8f8f8',
    gray2: '#dfdfdf',
    gray3: '#aaa',
    gray4: '#888',
    dark: '#342e37',
    light: '#fafffd',
  },
  fonts: {
    baseSize: `${FONT_SIZE * 0.14}rem`,
    mediumTextSize: `${FONT_SIZE * 0.165}rem`,
    bigTextSize: `${FONT_SIZE * 0.18}rem`,
    h1Size: `${FONT_SIZE * 0.3}rem`,
    h2Size: `${FONT_SIZE * 0.25}rem`,
    h3Size: `${FONT_SIZE * 0.22}rem`,
    h4Size: `${FONT_SIZE * 0.19}rem`,
    baseLineHeight: 1.75,
  },
}

type Theme = typeof theme

export default styled as CreateStyled<Theme>
