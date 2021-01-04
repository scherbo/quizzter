import React from 'react'
import { Answer, QuizData } from '#root/types'
import { Heading, Paragraph } from '#root/components/Typography'
import styled from '#root/theme'

const Question = styled.div`
  padding: 25px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderOther};
  }
`

const AnswerList = styled.div``

const AnswerListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: ${({ theme }) => theme.fonts.baseSize};
`

const AnswerText = styled.div<{ current?: boolean; correct?: boolean }>`
  color: ${({ theme, current, correct }) => {
    if (current) {
      return correct ? theme.colors.primary : theme.colors.danger
    }

    if (correct) {
      return theme.colors.primary
    }

    return theme.colors.textMain
  }};
`

const AnswerTag = styled.div<{ correct?: boolean }>`
  margin-left: 15px;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.common.borderRadius};
  font-size: ${({ theme }) => theme.fonts.smallTextSize};
  background-color: ${({ theme, correct }) => (correct ? theme.colors.primary : theme.colors.danger)};
  color: #fff;
`

interface ResultProps {
  quiz: QuizData
  answers: (Answer | undefined)[]
}

export const Result = ({ quiz, answers }: ResultProps) => {
  const correct = answers.reduce((acc, curr) => (curr?.correct ? acc + 1 : acc), 0)
  const total = answers.length
  const percentage = ((correct * 100) / total).toFixed(2)

  return (
    <div>
      <Heading type="h3">Result</Heading>
      <Paragraph size="md">
        You got {correct} out of {total} ({percentage}%)
      </Paragraph>
      {quiz.questions.map((question, i) => (
        <Question key={question._id}>
          <Heading type="h4">{question.question}</Heading>
          <AnswerList>
            {question.answers.map((answer) => {
              const current = answers[i]
              const currentAnswered = answers[i]?._id === answer._id

              return (
                <AnswerListItem key={answer._id}>
                  <AnswerText current={currentAnswered} correct={answer?.correct}>
                    {answer.answer}
                  </AnswerText>
                  {currentAnswered && (
                    <AnswerTag correct={current?.correct}>
                      {current?.correct ? 'You were right' : 'You were wrong'}
                    </AnswerTag>
                  )}
                </AnswerListItem>
              )
            })}
          </AnswerList>
        </Question>
      ))}
    </div>
  )
}
