import React from 'react'

import styled from '#root/theme'
import { Request } from '#root/utils'
import { Container, Paragraph, Heading, Card } from '#root/components'
import { ExtendedNextPageContext, Answer, QuizData } from '#root/types'

import { Question } from '#root/components/pages/quiz/question'
import { Result } from '#root/components/pages/quiz/result'

interface QuizProps {
  quiz: QuizData
}

const ProgressBar = styled.div<{ progress: number }>`
  position: relative;
  height: 10px;
  margin-top: 15px;
  margin-bottom: 23px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.common.borderRadius};
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: ${({ progress }) => `translateX(${-100 + progress}%)`};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.common.borderRadius};
    transition: 0.3s;
  }
`

const Quiz = ({ quiz }: QuizProps) => {
  const [questionStep, setQuestionStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<(Answer | undefined)[]>([])
  const [progress, setProgress] = React.useState(0)

  const amountOfQuestions = quiz.questions.length

  const handleAnswer = (answer?: Answer) => () => {
    setAnswers((answers) => [...answers, answer])
    setQuestionStep((s) => s + 1)
  }

  React.useEffect(() => {
    setProgress((questionStep * 100) / amountOfQuestions)
  }, [questionStep])

  return (
    <div>
      <Container>
        <Heading type="h2">{quiz.title}</Heading>
        <Paragraph size="md">{quiz.description}</Paragraph>
        <ProgressBar progress={progress} />

        {quiz.questions[questionStep] ? (
          <Card>
            <Question question={quiz.questions[questionStep]} handleAnswer={handleAnswer} />
          </Card>
        ) : (
          <Result quiz={quiz} answers={answers} />
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
