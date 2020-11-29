import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { validateSigninForm } from '#root/utils'
import { Container, InputField, Button, Heading, Grid, Paragraph, Link } from '#root/components'
import { signinUser } from '#root/store'
import { SigninState } from '#root/types'

const Auth = () => {
  const dispatch = useDispatch()

  const handleSubmit = (values: SigninState) => {
    dispatch(signinUser(values))
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
