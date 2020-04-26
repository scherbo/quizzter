import React from 'react'

import { Input } from '#root/components'
import { hasError } from '#root/utils'

type InputFieldProps = {
  placeholder: string
  label: string
  input: any
  meta: any
}

// This is a middleware component for `react-final-form`, so I can use `Input` component independently
export const InputField = ({ placeholder, label, input, meta, ...rest }: InputFieldProps) => {
  const { name, value, onChange, type } = input
  const e = hasError(meta)

  return (
    <Input
      {...rest}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      error={e ? meta.error : undefined}
    />
  )
}
