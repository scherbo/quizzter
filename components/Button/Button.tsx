import React from 'react'
import { css } from '@emotion/core'
import darken from 'polished/lib/color/darken'

import styled from '#root/theme'

const ButtonTag = styled.button<{ btnType?: string; stretched?: boolean; disabled?: boolean }>`
  outline: none;
  border: none;

  min-width: 100px;
  width: ${({ stretched }) => stretched && '100%'};
  height: 40px;
  line-height: 38px;
  padding: 0 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  transition: 0.5s;
  cursor: pointer;

  ${({ btnType, disabled, theme }) => {
    if (disabled) {
      return css`
        background-color: ${theme.colors.neutral};
        color: ${theme.colors.neutralLightest};
      `
    }

    switch (btnType) {
      case 'primary':
        return css`
          background-color: ${theme.colors.primary};
          color: #fff;

          &:hover {
            background-color: ${theme.colors.primaryLighter};
          }

          &:active {
            background-color: ${theme.colors.primaryLightest};
          }
        `
      case 'danger':
        return css`
          background-color: ${theme.colors.danger};
          color: #fff;

          &:hover {
            background-color: ${theme.colors.dangerLighter};
          }

          &:active {
            background-color: ${theme.colors.dangerLightest};
          }
        `
      default:
        return css`
          background-color: ${theme.colors.textMain};
          color: ${theme.colors.background}};

          &:hover {
            background-color: ${darken(0.1, theme.colors.textMain)};
          }

          &:active {
            background-color: ${darken(0.2, theme.colors.textMain)};
          }
        `
    }
  }}
`

type ButtonProps = {
  htmlType?: 'button' | 'submit'
  children: React.ReactNode
  type?: 'primary' | 'danger' | 'neutral'
  stretched?: boolean
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button = ({ htmlType, children, type, stretched, disabled, onClick }: ButtonProps) => (
  <ButtonTag type={htmlType} btnType={type} stretched={stretched} disabled={disabled} onClick={onClick}>
    {children}
  </ButtonTag>
)
