import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '#root/store'
import { Paragraph, Heading, FlexContainer, Link } from '#root/components'

const Home = () => {
  const isAuthenticated = useSelector<RootState, boolean>((state) => state.session.authenticated)
  return (
    <FlexContainer alignItems="center" justifyContent="center" css={{ minHeight: 500, textAlign: 'center' }}>
      <div>
        <Heading type="h2" css={{ marginBottom: 5 }}>
          Welcome to the Quizzter!
        </Heading>
        <Paragraph size="md">
          A place where you can build and solve quizes.{' '}
          {isAuthenticated ? <Link href="/builder">Build a quiz!</Link> : <Link href="/auth">Sign in to start</Link>}
        </Paragraph>
      </div>
    </FlexContainer>
  )
}

export default Home
