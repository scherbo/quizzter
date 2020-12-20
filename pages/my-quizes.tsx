import React from 'react'
import withProtection from '#root/lib/withProtection'
import { Button, Card, Container, Heading, Paragraph } from '#root/components'
import { ExtendedNextPageContext } from '#root/types'

import { getLocaleDate } from '#root/utils/common'

import { Table } from '#root/components'
import { getMyQuizes, removeMyQuiz, RootState } from '#root/store'
import { useDispatch, useSelector } from 'react-redux'

interface Quiz {
  creationDate: string
  _id: string
  questions: Array<any>
  title: string
  description: string
  owner: string
}

const MyQuizzes = () => {
  const quizes = useSelector<RootState, Quiz[]>((state) => state.myQuizes.quizes)
  const dispatch = useDispatch()

  function handleRemove(id: string) {
    dispatch(removeMyQuiz(id))
  }

  return (
    <Container>
      <div css={{ padding: '0 25px', marginBottom: 25 }}>
        <Heading type="h3">My quizes</Heading>
        <Paragraph size="md">On this page you can manage quizes that you created earlier</Paragraph>
      </div>
      <Card>
        <Table
          data={quizes}
          rowKey={({ _id }) => _id}
          columns={[
            {
              header: 'Title',
              cellKey: 'title',
            },
            {
              header: 'Created at',
              cellKey: 'creationDate',
              renderer: ({ creationDate }) => getLocaleDate({ value: creationDate }),
            },
            {
              header: '',
              cellKey: 'actions',
              renderer: ({ _id }) => {
                return (
                  <div css={{ textAlign: 'right' }}>
                    <Button onClick={() => handleRemove(_id)}>Delete</Button>
                  </div>
                )
              },
            },
          ]}
        />
      </Card>
    </Container>
  )
}

MyQuizzes.getInitialProps = async (ctx: ExtendedNextPageContext) => {
  // this is a problem I can't figure out yet
  // for some reason request doesn't see cookies, so I have to inject them manually
  const cookie = ctx.req?.headers?.cookie || ''
  await ctx.store.dispatch(getMyQuizes(cookie) as any)

  return {}
}

export default withProtection(MyQuizzes)
