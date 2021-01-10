import React, { FC, useEffect, useRef, useState } from 'react'
import { Layout }                                 from '@atlantis-lab/layout'

import { Text }                                   from '@ui/text'
import { Transition }                             from '@ui/transition'

import { Input }                                  from './Input'

interface Props {
  label?: string
  type?: string
  focusedBorderColor?: string
  borderColor?: string
  placeholder?: string
  backgroundColor?: string
  height?: string
  width?: string
  padding?: string
  border?: string
  fontWeight?: string
  fontSize?: string
  lineHeight?: string
  disabled?: boolean
  value?: string
  color?: string
  borderRadius?: string
  onChange?: (arg0?: string) => void
  suffix?: any
  ref?: any
}

export const InputLabel: FC<Props> = ({
  label,
  focusedBorderColor,
  borderColor,
  placeholder,
  onChange,
  type,
  children,
  value,
  ...rest
}) => {
  const [focused, setFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(Boolean(value && value.length))
  const inputRef = useRef(null)

  useEffect(() => {
    setIsFilled(Boolean(value && value.length))
  }, [value])

  return (
    <Layout position='relative' width='100%'>
      <Input
        {...rest}
        type={type}
        borderColor={focused ? focusedBorderColor : borderColor}
        labelFontSize='normal'
        labelColor='gray'
        value={value}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => {
          setIsFilled(Boolean(e.target.value))
          onChange(e.target.value)
        }}
      />
      <Transition
        onClick={() => inputRef.current.focus()}
        position='absolute'
        top={isFilled || focused ? '9px' : '20px'}
        left='20px'
      >
        <Text color='placeholderGray' fontSize={isFilled || focused ? 'small' : 'medium'}>
          {placeholder}
        </Text>
      </Transition>
      {children}
    </Layout>
  )
}

InputLabel.defaultProps = {
  placeholder: '',
  backgroundColor: 'inputGray',
  type: 'text',
  height: '60px',
  width: '100%',
  padding: '14px 20px 0 20px',
  border: 'none',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: 'medium',
  color: 'semiBlack',
  borderRadius: 'none',
}
