import React from 'react'
import styled from '#root/theme'

const CardTag = styled.div`
  padding: 25px;
  border-radius: ${({ theme }) => theme.common.borderRadius};
  background-color: ${({ theme }) => theme.colors.backgroundThinner};
`

type CardProps = {
  children: React.ReactChild | React.ReactChild[]
}

export const Card = ({ children, ...rest }: CardProps) => <CardTag {...rest}>{children}</CardTag>
