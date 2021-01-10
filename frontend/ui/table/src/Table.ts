import styled    from '@emotion/styled'
import { space } from 'styled-system'

export const Table = styled('table')(({ theme, fixed }: any) => ({
  border: `1px solid ${theme.colors.borderGray}`,
  borderCollapse: 'collapse',
  tableLayout: fixed ? 'fixed' : 'auto',
  width: '100%',
}))
export const THead = styled('thead')(({ theme }: any) => ({
  '& td': {
    color: theme.colors.dustyGray,
  },
  '& tr:hover': {
    backgroundColor: theme.colors.white,
  },
}))
export const TBody = styled('tbody')()
export const Col = styled('col')(({ width }) => ({
  width,
}))
export const TR = styled('tr')(
  ({ theme, contentCenter, firstColumnCenter, secondColumnGray }: any) => ({
    '& td:nth-of-type(1)': {
      color: theme.colors.dustyGray,
      textAlign: firstColumnCenter ? 'center' : 'start',
    },
    '& td': {
      textAlign: contentCenter ? 'center' : 'start',
    },
    '& td:nth-of-type(2)': {
      color: secondColumnGray ? theme.colors.dustyGray : theme.colors.semiBlack,
    },
    ':hover': {
      backgroundColor: theme.colors.slightlyGray,
    },
  })
)
export const TD = styled('td')(
  ({ theme, textAlign }: any) => ({
    textAlign,
    border: `1px solid ${theme.colors.borderGray}`,
  }),
  space
)

TD.defaultProps = {
  padding: '12px 28px',
}
