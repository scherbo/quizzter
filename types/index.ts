import { AppProps, AppContext } from 'next/app'
import { NextPageContext } from 'next'
import { Store } from '@reduxjs/toolkit'

export type MyAppProps = AppProps & { store: Store }
export type ExtendedAppContext = AppContext & { ctx: NextPageContext & { store: Store } }
