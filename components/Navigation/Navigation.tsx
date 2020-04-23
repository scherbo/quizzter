import React from 'react'
import Link from 'next/link'

const NAVIGATION = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Sign In',
    href: '/auth',
  },
]

export const Navigation = () => (
  <nav style={{ textAlign: 'center' }}>
    <ul>
      {NAVIGATION.map(({ text, href }) => (
        <li key={text}>
          <Link href={href}>
            <a>{text}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
