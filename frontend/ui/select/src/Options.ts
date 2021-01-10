import styled            from '@emotion/styled'
import { createElement } from 'react'

import OnOutsideClick    from './OnOutsideClick'
import Option            from './Option'
import { OptionsProps }  from './types'

export const Component = styled.div(({ theme }: any) => ({
  position: 'absolute',
  left: -20,
  right: 20,
  top: 'calc(100% + 10px)',
  padding: '8px 0',
  background: theme.colors.white,
  borderRadius: theme.radii.normal,
  maxHeight: '160px',
  overflowX: 'hidden',
  overflowY: 'auto',
  boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.1)',
}))

const Options = ({
  currency,
  valueField,
  displayField,
  options,
  activeValue,
  select,
  onSelect,
  onToggle,
}: OptionsProps) =>
  createElement(OnOutsideClick, {
    onOutsideClick: onToggle,
    target: select,
    children: createElement(
      Component,
      {},
      options.map(option =>
        createElement(Option, {
          key: option[valueField],
          currency,
          data: option,
          activeValue,
          valueField,
          displayField,
          onSelect,
        })
      )
    ),
  })

export default Options
