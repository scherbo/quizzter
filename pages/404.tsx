import React from 'react'
import { FlexContainer, Heading, Paragraph } from '#root/components'

const Custom404 = () => (
  <FlexContainer alignItems="center" justifyContent="center" css={{ height: '100%' }}>
    <div css={{ textAlign: 'center' }}>
      <Heading type="h2">Status code: 404</Heading>
      <Paragraph>Sorry, page wasn&apos;t found.</Paragraph>
    </div>
  </FlexContainer>
)

export default Custom404
