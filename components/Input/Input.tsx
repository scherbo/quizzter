import React from 'react'
import styled from '#root/theme'

import { FONT_SIZE } from '#root/constants'

const InputContainer = styled.div`
  position: relative;
`

const InputLabel = styled.label`
  position: absolute;
  bottom: calc(100% + 3px);
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.dark};
`

const InputValue = styled.input<{ hasError?: boolean }>`
  outline: none;

  width: 100%;
  height: 40px;
  line-height: 38px;
  padding: 0 15px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ddd')};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fonts.baseSize};
  transition: 0.3s;

  &:focus {
    box-shadow: 0 0 3px 1px ${({ theme }) => theme.colors.primaryLightest};
  }
`

const InputError = styled.span`
  position: absolute;
  right: 0;
  top: calc(100% + 2px);
  font-size: ${FONT_SIZE};
  color: red;
`

type InputProps = {
  name: string
  type: string
  value: string
  label?: React.ReactNode
  placeholder?: string
  error?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ name, label, value, placeholder, type, error, onChange, ...rest }: InputProps) => {
  return (
    <InputContainer {...rest}>
      {label && <InputLabel>{label}</InputLabel>}
      <InputValue
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        hasError={error ? true : false}
      />
      {error && <InputError>{error}</InputError>}
    </InputContainer>
  )
}
