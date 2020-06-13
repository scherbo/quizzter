import React from 'react'

import { Container, Heading } from '#root/components'
import withProtection from '#root/lib/withProtection'

const Profile = () => {
  return (
    <Container>
      <Heading type="h3">Lorem ipsum</Heading>
      <div css={{ display: 'flex' }}>Lorem ipsum</div>
    </Container>
  )
}

export default withProtection(Profile)
