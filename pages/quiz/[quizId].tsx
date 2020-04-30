import React from 'react'

import { Request } from '#root/utils'
import { Container, Paragraph, Heading, Button, Radio } from '#root/components'
import { ExtendedNextPageContext } from '#root/types'

type QuestionProps = {
  question: {
    question: string
    answers: {
      answer: string
      correct: boolean
      _id: string
    }[]
  }
  handleAnswer: (value: { answer: string; correct: boolean }) => () => void
}

const Question = ({ question: { question, answers }, handleAnswer }: QuestionProps) => {
  const [selected, setSelected] = React.useState<null | { answer: string; correct: boolean }>(null)

  const handleSelectAnswer = (value: { answer: string; correct: boolean }) => () => {
    setSelected(value)
  }

  return (
    <div css={{ marginTop: 25 }}>
      <Paragraph>{question}</Paragraph>
      <ul>
        {answers.map(({ answer, _id, correct }) => (
          <li
            key={_id}
            onClick={handleSelectAnswer({ answer, correct })}
            css={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem', padding: '10px 0', cursor: 'pointer' }}
          >
            <Radio active={answer === selected?.answer} />
            <span css={{ marginLeft: 15 }}>{answer}</span>
          </li>
        ))}
      </ul>
      <Button onClick={handleAnswer(selected as { answer: string; correct: boolean })} disabled={!selected}>
        Answer question
      </Button>
    </div>
  )
}

type QuizProps = {
  quiz: Record<string, any>
}

const Quiz = ({ quiz }: QuizProps) => {
  const [questionStep, setQuestionStep] = React.useState(0)
  const [score, setScore] = React.useState(0)

  const handleAnswer = (answer: { answer: string; correct: boolean }) => () => {
    setScore((s) => (answer.correct ? s + 1 : s))
    setQuestionStep((s) => s + 1)
  }

  React.useEffect(() => {
    const questionsAmount = quiz.questions.length
    if (questionStep === questionsAmount) {
      alert(`You got ${score} correct answers out of ${questionsAmount} questions`)
    }
  }, [questionStep, score])

  return (
    <div css={{ paddingTop: 50 }}>
      <Container>
        <Heading type="h2">{quiz.title}</Heading>
        <Paragraph>{quiz.description}</Paragraph>

        {quiz.questions[questionStep] && (
          <Question question={quiz.questions[questionStep]} handleAnswer={handleAnswer} />
        )}
      </Container>
    </div>
  )
}

Quiz.getInitialProps = async (ctx: ExtendedNextPageContext) => {
  const { data } = await Request.getQuiz(ctx.query.quizId as string)

  return {
    quiz: data,
  }
}

export default Quiz
