import React from 'react'

import { Header } from '#root/components/Header'

export const Layout = ({ children }: { children: React.ReactChild }) => (
  <div>
    <Header />
    <main>{children}</main>
    <footer>footer</footer>
  </div>
)
