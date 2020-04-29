import React from 'react'
import styled from '#root/theme'

import { Heading, Paragraph } from '#root/components'

export const SectionTag = styled.section``

type SectionProps = {
  title: string
  description?: string
  children: React.ReactChild | React.ReactChild[]
}

export const Section = ({ title, description, children, ...rest }: SectionProps) => (
  <SectionTag {...rest}>
    {title && <Heading type="h4">{title}</Heading>}
    {description && <Paragraph>{description}</Paragraph>}
    {children}
  </SectionTag>
)
