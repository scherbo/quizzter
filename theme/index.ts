import styled, { CreateStyled } from '@emotion/styled'
import { FONT_SIZE } from '#root/constants'

/*
  I decided not to use polished just yet, so each main color gonna have at least 3 shades
  main colors:
    - primary
    - dark
    - danger
*/
export const theme = {
  colors: {
    primary: '#3185FC',
    primaryLighter: '#4a94fc',
    primaryLightest: '#63a3fd',
    dark: '#342e37',
    darkLighter: '#413a45',
    darkLightest: '#4e4553',
    danger: '#ff6464',
    dangerLighter: '#ff7d7d',
    dangerLightest: '#ff9797',
    pale: '#f5eaea',
    gray1: '#f8f8f8',
    gray2: '#dfdfdf',
    gray3: '#aaa',
    gray4: '#888',
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
