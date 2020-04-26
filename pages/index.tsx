import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '#root/store'
import { Paragraph, Heading, Container, Link } from '#root/components'

const Home = () => {
  const isAuthenticated = useSelector<RootState, boolean>((state) => state.session.authenticated)
  return (
    <Container display="flex" alignItems="center" justifyContent="center" css={{ minHeight: 500, textAlign: 'center' }}>
      <div>
        <Heading type="h2" css={{ marginBottom: 5 }}>
          Welcome to the Quizzter!
        </Heading>
        <Paragraph size="md">
          A place where you can build and solve quizes.{' '}
          {isAuthenticated ? (
            <Link href="/builder" prefetch={false}>
              Build a quiz!
            </Link>
          ) : (
            <Link href="/signin">Sign in to start</Link>
          )}
        </Paragraph>
      </div>
    </Container>
  )
}

export default Home
