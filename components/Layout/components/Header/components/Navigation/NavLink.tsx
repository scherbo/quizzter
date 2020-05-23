import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '#root/theme'

type ATagProps = {
  isActive: boolean
}

export const ATag = styled.a<ATagProps>`
  font-size: ${({ theme }) => theme.fonts.baseSize};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.textMain : theme.colors.textOther)};
  transition: 0.5s;
  cursor: pointer;
`

type NavLinkProps = {
  href: string
  children: React.ReactChild | React.ReactChild[]
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const { pathname } = useRouter()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <ATag isActive={isActive}>{children}</ATag>
    </Link>
  )
}
