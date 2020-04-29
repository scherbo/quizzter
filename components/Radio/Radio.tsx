import React from 'react'
import styled from '#root/theme'

const RadioRoot = styled.div<{ active?: boolean }>`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  transition: 0.3s;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: calc(50% - 3px);
    top: calc(50% - 3px);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: 0.3s;
  }

  &:focus {
    box-shadow: 0 0 3px 1px ${({ theme }) => theme.colors.primaryLightest};
  }
`

type RadioProps = {
  active?: boolean
  onClick: () => void
}

export const Radio = ({ active, onClick }: RadioProps) => <RadioRoot active={active} onClick={onClick} />
