import React from 'react'
import { Container, Paragraph, Heading } from '#root/components'
import { ExtendedNextPageContext } from '#root/types'
import { Request } from '#root/utils'

interface VerifyProps {
  email: string
}

const Verify = ({ email }: VerifyProps) => {
  return (
    <Container>
      <Heading type="h3">{email}</Heading>
      <Paragraph>You visited this page to verify your account!</Paragraph>
    </Container>
  )
}

Verify.getInitialProps = async (ctx: ExtendedNextPageContext) => {
  const { data, error } = await Request.verifyAccount(ctx.query.hash as string)

  if (ctx.res && error) {
    ctx.res.writeHead(301, { Location: '/' })
    ctx.res.end()
  }

  return {
    email: data && data.email ? data.email : null,
  }
}

export default Verify
