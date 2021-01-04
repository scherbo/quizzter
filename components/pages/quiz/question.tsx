import React from 'react'

import styled from '#root/theme'

import { Paragraph, Button, Radio } from '#root/components'
import { Answer } from '#root/types'

const QuestionList = styled.ul`
  margin-bottom: 15px;
  margin-top: 15px;
`

const QuestionListItem = styled.li`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: ${({ theme }) => theme.fonts.baseSize};
  padding: 10px 0;
  cursor: pointer;
`

interface QuestionProps {
  question: {
    question: string
    answers: Answer[]
  }
  handleAnswer: (answer?: Answer) => () => void
}

export const Question = ({ question: { question, answers }, handleAnswer }: QuestionProps) => {
  const [selected, setSelected] = React.useState<Answer>()

  const handleSelectAnswer = (value: Answer) => () => {
    setSelected(value)
  }

  return (
    <div>
      <Paragraph size="md">{question}</Paragraph>
      <QuestionList>
        {answers.map((answer) => (
          <QuestionListItem key={answer._id} onClick={handleSelectAnswer(answer)}>
            <Radio active={answer._id === selected?._id} />
            <span css={{ marginLeft: 15 }}>{answer.answer}</span>
          </QuestionListItem>
        ))}
      </QuestionList>
      <Button onClick={handleAnswer(selected)} disabled={!selected}>
        Answer question
      </Button>
    </div>
  )
}
