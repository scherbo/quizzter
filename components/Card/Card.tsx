import React from 'react'
import styled from '#root/theme'

const CardTag = styled.div`
  padding: 35px;
  border-radius: ${({ theme }) => theme.common.borderRadius};
  box-shadow: ${({ theme }) => theme.common.shadow};
`

type CardProps = {
  children: React.ReactChild | React.ReactChild[]
}

export const Card = ({ children, ...rest }: CardProps) => <CardTag {...rest}>{children}</CardTag>
