import React from 'react'

import { Link } from '#root/components'

export const Footer = () => (
  <footer css={{ padding: '20px 0', textAlign: 'center' }}>
    created by{' '}
    <Link href="https://github.com/scherbo" size="sm" target="_blank" external>
      Sergey Scherbo
    </Link>
  </footer>
)
