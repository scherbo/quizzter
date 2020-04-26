import React from 'react'
import styled from '@emotion/styled'

type ContainerProps = {
  display?: 'block' | 'flex'
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
}

const ContainerTag = styled.div<ContainerProps>`
  display: ${({ display = '' }) => display};
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ wrap }) => wrap};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  max-width: 1180px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
`

export const Container = ({
  display,
  direction,
  wrap,
  alignItems,
  justifyContent,
  children,
  ...rest
}: ContainerProps & { children: React.ReactChild | React.ReactChild[] }) => (
  <ContainerTag
    {...rest}
    display={display}
    direction={direction}
    wrap={wrap}
    alignItems={alignItems}
    justifyContent={justifyContent}
  >
    {children}
  </ContainerTag>
)
