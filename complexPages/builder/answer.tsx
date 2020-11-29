import React from 'react'
import { Field } from 'react-final-form'

import { InputField, Grid, Button, Radio } from '#root/components'

interface AnswerProps {
  active: boolean
  disabled: boolean
  answerName: string
  label: string
  placeholder?: string
  onSelect: () => void
  onRemove: () => void
}

export const Answer: React.FC<AnswerProps> = ({
  active,
  disabled,
  answerName,
  label,
  placeholder = 'Answer Sample',
  onSelect,
  onRemove,
}) => {
  return (
    <Grid.Layout templateColumns="auto 1fr auto" alignItems="center" gap="sm">
      <Radio active={active} onClick={onSelect} />
      <Field name={`${answerName}.answer`} placeholder={placeholder} label={label} component={InputField} />
      <Button htmlType="button" disabled={disabled} onClick={onRemove}>
        Remove answer
      </Button>
    </Grid.Layout>
  )
}
