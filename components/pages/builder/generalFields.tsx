import React from 'react'
import { Field } from 'react-final-form'

import { InputField, Grid, Section } from '#root/components'

export const GeneralFields = () => {
  return (
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
  )
}
