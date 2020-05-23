import styled, { CreateStyled } from '@emotion/styled'
import lighten from 'polished/lib/color/lighten'
import darken from 'polished/lib/color/darken'

import { FONT_SIZE } from '#root/constants'

const PRIMARY = '#3185FC'
const DARK = '#342e37'
const LIGHT = '#fff'
const DANGER = '#ff6464'
const NEUTRAL = '#999'

export const lightTheme = {
  colors: {
    primary: PRIMARY,
    primaryLighter: lighten(0.05, PRIMARY),
    primaryLightest: lighten(0.1, PRIMARY),

    danger: DANGER,
    dangerLighter: lighten(0.05, DANGER),
    dangerLightest: lighten(0.1, DANGER),

    neutral: NEUTRAL,
    neutralLighter: lighten(0.1, NEUTRAL),
    neutralLightest: lighten(0.2, NEUTRAL),

    background: LIGHT,
    backgroundSecondary: darken(0.1, LIGHT),
    backgroundOther: darken(0.2, LIGHT),

    textMain: DARK,
    textSecondary: lighten(0.2, DARK),
    textOther: lighten(0.4, DARK),

    borderMain: DARK,
    borderSecondary: '#aaa',
  },
  fonts: {
    smallTextSize: `${FONT_SIZE * 0.12}rem`,
    baseSize: `${FONT_SIZE * 0.14}rem`,
    mediumTextSize: `${FONT_SIZE * 0.165}rem`,
    bigTextSize: `${FONT_SIZE * 0.18}rem`,
    h1Size: `${FONT_SIZE * 0.3}rem`,
    h2Size: `${FONT_SIZE * 0.25}rem`,
    h3Size: `${FONT_SIZE * 0.22}rem`,
    h4Size: `${FONT_SIZE * 0.19}rem`,
    baseLineHeight: 1.75,
  },
  common: {
    borderRadius: '5px',
    shadow: '0 0 20px 2px rgba(0, 0, 0, .05)',
  },
}

type Theme = typeof lightTheme

export const darkTheme: Theme = {
  colors: {
    primary: PRIMARY,
    primaryLighter: lighten(0.05, PRIMARY),
    primaryLightest: lighten(0.1, PRIMARY),

    danger: DANGER,
    dangerLighter: lighten(0.05, DANGER),
    dangerLightest: lighten(0.1, DANGER),

    neutral: NEUTRAL,
    neutralLighter: lighten(0.1, NEUTRAL),
    neutralLightest: lighten(0.2, NEUTRAL),

    background: DARK,
    backgroundSecondary: lighten(0.1, DARK),
    backgroundOther: lighten(0.2, DARK),

    textMain: LIGHT,
    textSecondary: darken(0.2, LIGHT),
    textOther: darken(0.4, LIGHT),

    borderMain: LIGHT,
    borderSecondary: '#999',
  },
  fonts: {
    smallTextSize: `${FONT_SIZE * 0.12}rem`,
    baseSize: `${FONT_SIZE * 0.14}rem`,
    mediumTextSize: `${FONT_SIZE * 0.165}rem`,
    bigTextSize: `${FONT_SIZE * 0.18}rem`,
    h1Size: `${FONT_SIZE * 0.3}rem`,
    h2Size: `${FONT_SIZE * 0.25}rem`,
    h3Size: `${FONT_SIZE * 0.22}rem`,
    h4Size: `${FONT_SIZE * 0.19}rem`,
    baseLineHeight: 1.75,
  },
  common: {
    borderRadius: '5px',
    shadow: '0 0 20px 2px rgba(255, 255, 255, .05)',
  },
}

export default styled as CreateStyled<Theme>
