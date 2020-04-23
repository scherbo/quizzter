import React from 'react'

import { ExtendedAppContext } from '#root/types'
import { initStore } from '#root/store'

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState: Record<string, any>) {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default (App: any) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext: ExtendedAppContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const store = getOrCreateStore({})

      // Provide the store to getInitialProps of pages
      appContext.ctx.store = store

      const appProps = App.getInitialProps ? await App.getInitialProps(appContext) : {}

      return {
        ...appProps,
        initialReduxState: store.getState(),
      }
    }

    render() {
      // @ts-ignore
      // eslint-disable-next-line react/prop-types
      const { initialReduxState } = this.props
      return <App {...this.props} store={getOrCreateStore(initialReduxState)} />
    }
  }
}
