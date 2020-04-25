import React from 'react'
import styled from '@emotion/styled'

type FlexContainerProps = {
  inline?: boolean
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
}

const FlexContainerTag = styled.div<FlexContainerProps>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ wrap }) => wrap};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  max-width: 1180px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
`

export const FlexContainer = ({
  inline,
  direction,
  wrap,
  alignItems,
  justifyContent,
  children,
  ...rest
}: FlexContainerProps & { children: React.ReactChild | React.ReactChild[] }) => (
  <FlexContainerTag
    {...rest}
    inline={inline}
    direction={direction}
    wrap={wrap}
    alignItems={alignItems}
    justifyContent={justifyContent}
  >
    {children}
  </FlexContainerTag>
)
