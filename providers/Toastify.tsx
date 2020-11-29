import React from 'react'
import { ToastContainer as NotStyledContainer } from 'react-toastify'
import styled from '@emotion/styled'
import { useTheme } from 'emotion-theming'

import { Theme } from '#root/theme'

export const StyledToasts = styled(NotStyledContainer)<{ success: string; danger: string }>`
  .Toastify__toast {
    font-size: 14px;
  }

  .Toastify__toast--success {
    background-color: ${({ success }) => success};
  }

  .Toastify__toast--error {
    background-color: ${({ danger }) => danger};
  }
`

export const ToastContainer = () => {
  const theme = useTheme<Theme>()
  return (
    <StyledToasts
      position="bottom-right"
      autoClose={3500}
      hideProgressBar
      success={theme.colors.primary}
      danger={theme.colors.danger}
    />
  )
}
