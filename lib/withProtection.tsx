import React from 'react'
import { NextPage } from 'next'
import { ExtendedNextPageContext } from '#root/types'

export default function withProtection(Component: NextPage) {
  return class Authenticated extends React.Component {
    static async getInitialProps(ctx: ExtendedNextPageContext) {
      if (ctx.res) {
        const { session } = ctx.store.getState()

        if (!session.authenticated) {
          ctx.res.writeHead(301, { Location: '/' })
          ctx.res.end()
        }
      }

      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps = Component.getInitialProps && (await Component.getInitialProps(ctx))
      // Return props.
      return { ...pageProps }
    }

    render() {
      return <Component {...this.props} />
    }
  }
}
