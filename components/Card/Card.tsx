import React from 'react'
import styled from '#root/theme'

const CardTag = styled.div`
  padding: 35px;
  border-radius: ${({ theme }) => theme.common.borderRadius};
  background-color: #fff;
  box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.1);
`

type CardProps = {
  children: React.ReactChild | React.ReactChild[]
}

export const Card = ({ children, ...rest }: CardProps) => <CardTag {...rest}>{children}</CardTag>
