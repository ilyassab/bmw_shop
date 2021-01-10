import styled                                         from '@emotion/styled'
import { Input }                                      from '@atlantis-lab/input'
import { WrappedComponentProps }                      from 'react-intl'
import { createElement, useRef }                      from 'react'

import { SelectDownArrowIcon }                        from '@ui/icons'

import Options                                        from './Options'
import enhance                                        from './enhance'
import { SelectProps }                                from './types'
import { currency as getCurrency, value as getValue } from './get'

export const Wrapper = styled.div(({ disabled, toggled }: any) => ({
  position: 'relative',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  zIndex: toggled ? 3 : 1,
  '> svg': {
    transition: '0.35s',
    transform: `${toggled ? 'rotate(180deg)' : 'rotate(0deg)'}`,
  },
  input: {
    cursor: disabled ? 'initial' : 'pointer',
  },
}))

const Select = ({
  value,
  currency,
  disabled,
  placeholder,
  options,
  valueField,
  displayField,
  toggle,
  toggled,
  onSelect,
  onToggle,
  onOpen,
  intl,
  ...inputProps
}: SelectProps & WrappedComponentProps) => {
  const selectRef = useRef()
  const inputValue = getValue(value, options, valueField, displayField)

  return createElement(
    Wrapper,
    {
      ref: selectRef,
      toggled,
      disabled,
      onClick: onToggle,
    },
    [
      createElement(Input, {
        key: 'input',
        disabled,
        readOnly: true,
        placeholder,
        height: '24px',
        padding: '0 20px 0 20px',
        border: 'input',
        fontWeight: 'normal',
        fontSize: 'default',
        lineHeight: 'medium',
        color: 'semiBlack',
        borderRadius: 'extra',
        value: currency ? getCurrency(inputValue, intl) : inputValue,
        ...inputProps,
      }),
      createElement(SelectDownArrowIcon, { key: 'icon', width: 13, height: 8 }),
      toggled &&
        createElement(Options, {
          key: 'options',
          currency,
          options,
          valueField,
          displayField,
          activeValue: value || {},
          select: selectRef.current,
          onToggle,
          onSelect,
        }),
    ]
  )
}

Select.defaultProps = {
  valueField: 'id',
  displayField: 'name',
  disabled: false,
  options: [],
}

export default enhance(Select)
