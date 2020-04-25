import React from 'react'
import { Global, css } from '@emotion/core'

import { FONT_SIZE } from '#root/constants'
import { Reset } from './Reset'

export const GlobalStyles = () => (
  <>
    <Reset />
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css?family=Work+Sans&display=swap');

        html {
          font-size: ${FONT_SIZE}px;
        }

        body {
          font-family: 'Work Sans', Arial, Helvetica, sans-serif;
          font-size: 1rem;
        }
      `}
    />
  </>
)
