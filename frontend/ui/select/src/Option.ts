import styled                                from '@emotion/styled'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { createElement }                     from 'react'

import { OptionProps, OptionStyleProps }     from './types'
import { currency as getCurrency }           from './get'

export const Component = styled.div<OptionStyleProps>(({ isActive, theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px 9px',
  boxSizing: 'border-box',
  fontSize: theme.fontSizes.semiMedium,
  lineHeight: theme.lineHeights.medium,
  color: isActive ? theme.colors.semiBlack : theme.colors.dustyGray,
  fontWeight: theme.fontWeights.normal,
  fontFamily: theme.fonts.primary,
  cursor: 'pointer',
  backgroundColor: theme.colors.white,
  transition: 'background-color ease-in .1s, color ease-in .1s',
  ':hover': {
    backgroundColor: theme.colors.semiGray,
  },
}))

const Option = ({
  activeValue,
  currency,
  intl,
  data,
  displayField,
  valueField,
  onSelect,
}: OptionProps & WrappedComponentProps) =>
  createElement(
    Component,
    {
      onClick: () => onSelect(data),
      isActive: data[valueField] === activeValue[valueField],
    },
    currency ? getCurrency(data[displayField], intl) : data[displayField]
  )

export default injectIntl(Option)
