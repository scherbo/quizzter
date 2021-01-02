import React from 'react'
import { Field } from 'react-final-form'
import { Grid, Button, InputField } from '#root/components'

interface QuestionProps {
  questionName: string
  disabled: boolean
  label: string
  placeholder?: string
  onRemove: () => void
}

export const Question = ({
  questionName,
  disabled,
  label,
  placeholder = 'Sample question',
  onRemove,
}: QuestionProps) => {
  return (
    <Grid.Layout templateColumns="1fr auto" gap="sm">
      <Field name={`${questionName}.question`} placeholder={placeholder} label={label} component={InputField} />
      <Button htmlType="button" disabled={disabled} onClick={onRemove}>
        Remove queston
      </Button>
    </Grid.Layout>
  )
}
