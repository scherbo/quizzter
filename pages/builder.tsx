import React from 'react'
import { Form, Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

import { Container, Heading, Paragraph, Card, InputField, Grid, Section, Button, Radio } from '#root/components'
import { validateBuilderForm, Request } from '#root/utils'
import withProtection from '#root/lib/withProtection'

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
                <Section title="General information" description="Fill in general information about your new quiz">
                  <Grid.Layout gap="xxl" css={{ marginTop: 40 }}>
                    <Field name="title" label="Title" placeholder="Medieval period" component={InputField} />
                    <Field
                      name="description"
                      label="Description"
                      placeholder="It began with the fall of the Western Roman Empire and merged..."
                      as="textarea"
                      component={InputField}
                    />
                  </Grid.Layout>
                </Section>
                <Section title="List of Questions" description="Add as many questions you want!">
                  <FieldArray name="questions">
                    {({ fields: questions }) => (
                      <div css={{ marginTop: 40 }}>
                        <Grid.Layout gap="xxl">
                          {questions.map((questionName, index) => (
                            <div key={questionName}>
                              {/* === QUESTION STARTS HERE === */}
                              <Grid.Layout templateColumns="1fr auto" gap="sm">
                                <Field
                                  name={`${questionName}.question`}
                                  placeholder="When did Medieval period begin?"
                                  label={`Question #${index}`}
                                  component={InputField}
                                />
                                <Button
                                  htmlType="button"
                                  disabled={questions.length === 1}
                                  onClick={() => questions.remove(index)}
                                >
                                  Remove queston
                                </Button>
                              </Grid.Layout>
                              {/* === QUESTION ENDS HERE */}

                              {/* ==== ANSWERS STARTS HERE ==== */}
                              <FieldArray name={`${questionName}.answers`}>
                                {({ fields: answers }) => (
                                  <div
                                    css={{
                                      marginTop: 40,
                                      paddingLeft: 25,
                                      borderLeft: '1px solid #eee',
                                      borderBottom: '1px solid #eee',
                                      borderBottomLeftRadius: '5px',
                                    }}
                                  >
                                    <Grid.Layout gap="xxl">
                                      {answers.map((answerName, j) => (
                                        <div key={answerName}>
                                          <Grid.Layout templateColumns="auto 1fr auto" alignItems="center" gap="sm">
                                            <Radio
                                              active={answers.value[j].correct}
                                              onClick={() => {
                                                answers.forEach((_, index) => {
                                                  answers.update(index, {
                                                    answer: answers.value[index].answer,
                                                    correct: j === index ? true : false,
                                                  })
                                                })
                                              }}
                                            />
                                            <Field
                                              name={`${answerName}.answer`}
                                              placeholder="Answer sample"
                                              label={`Answer #${j}`}
                                              component={InputField}
                                            />
                                            <Button
                                              htmlType="button"
                                              disabled={
                                                answers.value[j].correct ||
                                                (answers.length ? answers.length <= 2 : false)
                                              }
                                              onClick={() => answers.remove(j)}
                                            >
                                              Remove answer
                                            </Button>
                                          </Grid.Layout>
                                        </div>
                                      ))}
                                    </Grid.Layout>
                                    <div css={{ paddingLeft: 34, paddingBottom: 25, paddingTop: 25 }}>
                                      <Button
                                        htmlType="button"
                                        onClick={() => answers.push({ answer: 'Sample answer', correct: false })}
                                      >
                                        Add answer
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </FieldArray>
                              {/* === ANSWERS ENDS HERE === */}
                            </div>
                          ))}
                        </Grid.Layout>
                        <Grid.Layout templateColumns="auto auto" gap="sm" css={{ marginTop: 25 }}>
                          <Button
                            htmlType="button"
                            onClick={() =>
                              questions.push({
                                question: 'Sample question',
                                answers: [
                                  { answer: 'Sample answer', correct: true },
                                  { answer: 'Second sample answer', correct: false },
                                ],
                              })
                            }
                          >
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
