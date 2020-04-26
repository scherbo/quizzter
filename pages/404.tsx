import React from 'react'
import { Container, Heading, Paragraph } from '#root/components'

const Custom404 = () => (
  <Container alignItems="center" justifyContent="center" css={{ height: '100%' }}>
    <div css={{ textAlign: 'center' }}>
      <Heading type="h2">Status code: 404</Heading>
      <Paragraph>Sorry, page wasn&apos;t found.</Paragraph>
    </div>
  </Container>
)

export default Custom404
