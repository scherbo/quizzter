import React from 'react'
import { Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

import { Container, Heading, Paragraph, Card, Grid, Section, Button } from '#root/components'
import { validateBuilderForm, Request } from '#root/utils'
import withProtection from '#root/lib/withProtection'

import { GeneralFields } from '#root/components/pages/builder/generalFields'
import { Question } from '#root/components/pages/builder/question'
import { Answer } from '#root/components/pages/builder/answer'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const handleSubmit = async (values: any) => {
    const { error } = await Request.createQuiz(values)

    if (error) {
      toast.error(error)
    } else {
      toast.success('Quiz was successfully created!')

      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
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
      <div css={{ padding: '0 25px', marginBottom: 25 }}>
        <Heading type="h2">Quiz builder</Heading>
        <Paragraph size="md">
          This is a quiz builder. Here you will create awesome quizes to share them with your friends later!
        </Paragraph>
      </div>
      <Form
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        validate={validateBuilderForm}
        mutators={{ ...arrayMutators }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
