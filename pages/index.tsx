import React from 'react'
import { useSelector } from 'react-redux'
import NextLink from 'next/link'

import { RootState } from '#root/store'
import { Paragraph, Heading, Container, Link, Card } from '#root/components'
import { ExtendedNextPageContext } from '#root/types'
import { getAllQuizes } from '#root/store'

const getDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}/${month}/${day}`
}

const Home = () => {
  const isAuthenticated = useSelector<RootState, boolean>((state) => state.session.authenticated)
  const quizes = useSelector<RootState, Record<string, any>[]>((state) => state.allQuizes.quizes)

  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="center"
        css={{ minHeight: 500, textAlign: 'center' }}
      >
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
      {quizes.length > 0 && (
        <Container>
          <div>
            {quizes.map((quiz) => (
              <NextLink href="/quiz/[quizId]" as={`/quiz/${quiz._id}`} key={quiz._id}>
                <Card css={{ cursor: 'pointer', marginBottom: 25 }}>
                  <Heading type="h4">{quiz.title}</Heading>
                  <Paragraph css={{ marginBottom: 25 }}>{quiz.description}</Paragraph>
                  <Paragraph>Created at: {getDate(quiz.creationDate)}</Paragraph>
                </Card>
              </NextLink>
            ))}
          </div>
        </Container>
      )}
    </>
  )
}

Home.getInitialProps = async (ctx: ExtendedNextPageContext) => {
  await ctx.store.dispatch(getAllQuizes() as any)

  return {}
}

export default Home
