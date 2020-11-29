import React from 'react'
import { Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

import { Container, Heading, Paragraph, Card, Grid, Section, Button } from '#root/components'
import { validateBuilderForm, Request } from '#root/utils'
import withProtection from '#root/lib/withProtection'

import { GeneralFields } from './generalFields'
import { Question } from './question'
import { Answer } from './answer'

const INITIAL_VALUES = {
  questions: [
    {
      question: 'What is the capital of Italy?',
      answers: [
        {
          answer: 'Turin',
          correct: false,
        },
        {
          answer: 'Naples',
          correct: false,
        },
        {
          answer: 'Rome',
          correct: true,
        },
      ],
    },
  ],
}

const Builder = () => {
  const handleSubmit = async (values: any) => {
    const response = await Request.createQuiz(values)

    console.log(response)
  }

  const handleRemoveQuestion = (questions: any, index: number) => () => {
    questions.remove(index)
  }

  const handleRemoveAnswer = (answers: any, index: number) => () => {
    answers.remove(index)
  }

  const handleSelectAnswer = (answers: any, j: number) => () => {
    answers.forEach((_: any, index: number) => {
      answers.update(index, {
        answer: answers.value[index].answer,
        correct: j === index ? true : false,
      })
    })
  }

  const handleAddAnswer = (answers: any) => () => {
    answers.push({ answer: 'Sample answer', correct: false })
  }

  const handleAddQuestion = (questions: any) => () => {
    questions.push({
      question: 'Sample question',
      answers: [
        { answer: 'Sample answer', correct: true },
        { answer: 'Second sample answer', correct: false },
      ],
    })
  }

  return (
    <Container>
      <Heading type="h2" textAlign="center">
        Quiz builder
      </Heading>
      <Paragraph textAlign="center">
        This is a quiz builder. Here you will create awesome quizes to share them with your friends later!
      </Paragraph>
      <Form
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        validate={validateBuilderForm}
        mutators={{ ...arrayMutators }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} css={{ marginTop: 50 }}>
            <Card>
              <Grid.Layout gap="xxl">
                {/* GENERAL FIELDS */}
                <GeneralFields />

                <Section title="List of Questions" description="Add as many questions you want!">
                  <FieldArray name="questions">
                    {({ fields: questions }) => (
                      <div css={{ marginTop: 40 }}>
                        <Grid.Layout gap="xxl">
                          {questions.map((questionName, questionIndex) => (
                            <div key={questionName}>
                              {/* QUESTION */}
                              <Question
                                label={`Question #${questionIndex}`}
                                placeholder="When did Medieval period begin?"
                                questionName={questionName}
                                disabled={questions.length === 1}
                                onRemove={handleRemoveQuestion(questions, questionIndex)}
                              />

                              <FieldArray name={`${questionName}.answers`}>
                                {({ fields: answers }) => (
                                  <div css={{ marginTop: 40 }}>
                                    <Grid.Layout gap="xxl">
                                      {answers.map((answerName, answerIndex) => (
                                        <div key={answerName}>
                                          {/* ANSWER */}
                                          <Answer
                                            label={`Answer #${answerIndex}`}
                                            answerName={answerName}
                                            active={answers.value[answerIndex].correct}
                                            disabled={answers.length ? answers.length <= 2 : false}
                                            onSelect={handleSelectAnswer(answers, answerIndex)}
                                            onRemove={handleRemoveAnswer(answers, answerIndex)}
                                          />
                                        </div>
                                      ))}
                                    </Grid.Layout>
                                    <div css={{ paddingLeft: 34, paddingBottom: 25, paddingTop: 25 }}>
                                      <Button htmlType="button" onClick={handleAddAnswer(answers)}>
                                        Add answer
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          ))}
                        </Grid.Layout>
                        <Grid.Layout templateColumns="auto auto" gap="sm" css={{ marginTop: 25 }}>
                          <Button htmlType="button" onClick={handleAddQuestion(questions)}>
                            Add question
                          </Button>
                          <Button htmlType="submit" type="primary">
                            Submit form
                          </Button>
                        </Grid.Layout>
                      </div>
                    )}
                  </FieldArray>
                </Section>
              </Grid.Layout>
            </Card>
          </form>
        )}
      </Form>
    </Container>
  )
}

export default withProtection(Builder)
