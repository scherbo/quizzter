import styled from '@emotion/styled'

const position = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
}

const gapSizes = {
  sm: '14px',
  md: '18px',
  lg: '24px',
  xl: '30px',
  xxl: '40px',
}

type GridLayoutProps = {
  inline?: boolean
  justifyItems?: keyof typeof position
  alignItems?: keyof typeof position
  templateColumns?: string
  templateRows?: string
  gap?: keyof typeof gapSizes
}

const GridLayout = styled.div<GridLayoutProps>`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  justify-items: ${({ justifyItems }) => justifyItems};
  align-items: ${({ alignItems }) => alignItems};
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  grid-template-rows: ${({ templateRows }) => templateRows};
  gap: ${({ gap }) => gap && gapSizes[gap]};
`

const GridBox = styled.div``

export const Grid = {
  Layout: GridLayout,
  Box: GridBox,
}
