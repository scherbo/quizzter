import React from 'react'
import { Form, Field } from 'react-final-form'

import { Request, validateSigninForm } from '#root/utils'
import { FlexContainer, InputField, Button, Heading, Grid, Paragraph, Link } from '#root/components'
import { SigninState } from '#root/types'

const Auth = () => {
  const [asyncError, setAsyncError] = React.useState<null | string>(null)

  const handleSubmit = async (values: SigninState) => {
    const { error } = await Request.signin(values)

    setAsyncError(error)

    if (!error) {
      location.assign('/')
    }
  }

  return (
    <FlexContainer alignItems="center" justifyContent="center" css={{ minHeight: '500px', textAlign: 'center' }}>
      <Form onSubmit={handleSubmit} validate={validateSigninForm}>
        {({ handleSubmit }) => (
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
                <Button htmlType="submit" type="neutral" stretched>
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
    </FlexContainer>
  )
}

export default Auth
