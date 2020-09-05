import React from 'react'
import { Container, Paragraph, Text } from '#root/components'
import { ExtendedNextPageContext } from '#root/types'
import { Request } from '#root/utils'

interface VerifyProps {
  email: string
}

const Verify = ({ email }: VerifyProps) => {
  return (
    <Container display="flex" alignItems="center" justifyContent="center" css={{ height: 280 }}>
      <div css={{ textAlign: 'center' }}>
        <Paragraph size="md" css={{ marginBottom: 10 }}>
          You account was verified:{' '}
          <Text size="md" color="main" weight="bold">
            {email}
          </Text>
        </Paragraph>
        <Paragraph size="md">We hope you'll enjoy using our application</Paragraph>
      </div>
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
