import React from 'react'
import { useTheme } from 'emotion-theming'
import { useRouter } from 'next/router'
import { css } from '@emotion/core'

import { Theme } from '#root/theme'
import { ToastContainer } from '#root/providers/Toastify'
import { Grid, GlobalStyles } from '#root/components'

import { Header, Footer } from './components'

const layoutStyles = (theme: Theme) => css`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  transition: 0.5s;
`

export const Layout = ({ children }: { children: React.ReactChild }) => {
  const theme = useTheme<Theme>()
  const { pathname } = useRouter()

  const paddingTop = pathname === '/' ? 0 : 50

  return (
    <>
      <GlobalStyles />
      <Grid.Layout templateRows="50px 1fr auto" css={layoutStyles(theme)}>
        <Header />
        <main css={{ paddingTop }}>{children}</main>
        <Footer />
        <ToastContainer />
      </Grid.Layout>
    </>
  )
}
