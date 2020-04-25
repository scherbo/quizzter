import styled from '@emotion/styled'

const position = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
}

type GridLayoutProps = {
  inline?: boolean
  justifyItems?: keyof typeof position
  alignItems?: keyof typeof position
  templateColumns?: string
  templateRows?: string
}

const GridLayout = styled.div<GridLayoutProps>`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  justify-items: ${({ justifyItems }) => justifyItems};
  align-items: ${({ alignItems }) => alignItems};
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  grid-template-rows: ${({ templateRows }) => templateRows};
`

const GridBox = styled.div``

export const Grid = {
  Layout: GridLayout,
  Box: GridBox,
}
