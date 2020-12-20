import React from 'react'
import styled from '#root/theme'

export const TableElement = styled.div``

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  transition: 0.3s;

  &:not(:last-child) {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderOther}`};
  }
`

export const TableHeaderRow = styled(TableRow)``

export const TableBodyRow = styled(TableRow)``

export const TableCell = styled.div<{ width?: number; align?: 'left' | 'right' | 'center' }>`
  height: 60px;
  line-height: 60px;
  font-size: 1.4rem;
  flex-basis: ${({ width }) => `${width}%`};
  text-align: ${({ align }) => align};
  color: ${({ theme }) => theme.colors.textMain};
  transition: 0.3s;
`

interface TableProps<T> {
  data: T[]
  columns: Array<{
    header?: string
    align?: 'left' | 'right' | 'center'
    cellKey: string
    renderer?: (props: T) => any
  }>
  rowKey: (props: T) => any
}

export const Table = <T extends {}>({ data, columns, rowKey }: TableProps<T>) => {
  const equalWidth = 100 / columns.length

  return (
    <TableElement>
      <TableHeaderRow>
        {columns.map((column) => (
          <TableCell key={column.cellKey} width={equalWidth} align={column.align}>
            {column.header}
          </TableCell>
        ))}
      </TableHeaderRow>
      {data.map((row) => (
        <TableBodyRow key={rowKey(row)}>
          {columns.map((column) => (
            <TableCell key={column.cellKey} width={equalWidth} align={column.align}>
              {column.renderer ? column.renderer(row) : row[column.cellKey]}
            </TableCell>
          ))}
        </TableBodyRow>
      ))}
    </TableElement>
  )
}
