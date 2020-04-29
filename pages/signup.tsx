import React from 'react'
import { Form, Field } from 'react-final-form'

import { Request, validateSignupForm } from '#root/utils'
import { Container, Button, Heading, Grid, Paragraph, Link, InputField } from '#root/components'
import { SignupState } from '#root/types'

const Auth = () => {
  const [asyncError, setAsyncError] = React.useState<string | null>(null)

  const handleSubmit = async (values: SignupState) => {
    const { error } = await Request.signup(values)

    setAsyncError(error)

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
      <Form onSubmit={handleSubmit} validate={validateSignupForm}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} css={{ width: 280 }}>
            <Heading type="h3" css={{ marginBottom: 20 }}>
              Join Quizzer!
            </Heading>
            <Grid.Layout gap="lg">
              <Grid.Box>
                <Field name="name" type="text" placeholder="Name" component={InputField} />
              </Grid.Box>
              <Grid.Box>
                <Field name="email" type="text" placeholder="Email" component={InputField} />
              </Grid.Box>
              <Grid.Box>
                <Field name="password" type="password" placeholder="Password" component={InputField} />
              </Grid.Box>
              <Grid.Box>
                <Field name="passwordRepeat" type="password" placeholder="Repeat password" component={InputField} />
              </Grid.Box>
              <Grid.Box>
                <Button htmlType="submit" type="neutral" disabled={submitting} stretched>
                  Submit
                </Button>
              </Grid.Box>
            </Grid.Layout>
            {asyncError && <Paragraph>{asyncError}</Paragraph>}
            <Paragraph css={{ marginTop: 20 }}>
              Already have an account? <Link href="/signin">Sign in</Link>
            </Paragraph>
          </form>
        )}
      </Form>
    </Container>
  )
}

export default Auth
