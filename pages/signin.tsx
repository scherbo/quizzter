import React from 'react'
import { Form, Field } from 'react-final-form'
import { setCookie } from 'nookies'

import { Request, validateSigninForm } from '#root/utils'
import { Container, InputField, Button, Heading, Grid, Paragraph, Link } from '#root/components'
import { SigninState } from '#root/types'

const Auth = () => {
  const [asyncError, setAsyncError] = React.useState<null | string>(null)

  const handleSubmit = async (values: SigninState) => {
    const { error, data } = await Request.signin(values)

    setAsyncError(error)

    if (data) {
      setCookie(null, 'token', data.token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
    }

    if (!error) {
      location.assign('/')
    }
  }

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      css={{ minHeight: '500px', textAlign: 'center' }}
    >
      <Form onSubmit={handleSubmit} validate={validateSigninForm}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} css={{ width: 280 }}>
            <Heading type="h3" css={{ marginBottom: 20 }}>
              Welcome back!
            </Heading>
            <Grid.Layout gap="lg">
              <Grid.Box>
                <Field name="email" type="text" placeholder="Email" component={InputField} />
              </Grid.Box>
              <Grid.Box>
                <Field name="password" type="password" placeholder="Password" component={InputField} />
              </Grid.Box>
              <Grid.Box>
                <Button htmlType="submit" type="neutral" disabled={submitting} stretched>
                  Submit
                </Button>
              </Grid.Box>
            </Grid.Layout>
            {asyncError && <Paragraph>{asyncError}</Paragraph>}
            <Paragraph css={{ marginTop: 20 }}>
              Don&apos;t have an account yet? <Link href="/signup">Sign up</Link>
            </Paragraph>
          </form>
        )}
      </Form>
    </Container>
  )
}

export default Auth
