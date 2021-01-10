import styled                                     from '@emotion/styled'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Layout }                            from '@atlantis-lab/layout'
import { layout }                                 from 'styled-system'

import { Condition }                              from '@ui/condition'
import { Divider }                                from '@ui/divider'
import { BmwSelectIcon }                          from '@ui/icons'
import { LiveTyping }                             from '@ui/live-typing'
import { Text }                                   from '@ui/text'
import { Transition }                             from '@ui/transition'

// TODO Delete BMW prefix in all code

interface Props {
  items?: string[]
  value?: string
  height?: string
  liveTop?: string
  maxWidth?: string | string[]
  padding?: string
  liveTypingWidth?: string | string[]
  liveTypingLeft?: number | string | number[]
  color?: string
  cursorRight?: number
  cursorTop?: number
  backgroundColor?: string
  onClick?: (arg0?: any) => void
}

const StyledSelect = styled.select(
  {
    opacity: 0,
    position: 'absolute',
  },
  layout
)

const BMWBlockSelect: FC<Props> = ({
  items,
  value,
  height = '37px',
  backgroundColor,
  cursorTop,
  color,
  cursorRight,
  padding,
  liveTypingWidth,
  liveTypingLeft,
  maxWidth,
  liveTop,
  onClick,
}) => {
  const [opened, setOpened] = useState(false)
  const inputRef = useRef(null)

  const handleClickOutside = event => {
    if (inputRef && inputRef.current && !inputRef.current.contains(event.target)) {
      setOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <>
      <Transition
        boxSizing='border-box'
        flexDirection='column'
        width='100%'
        maxWidth={maxWidth || 'initial'}
        cursor={items && items.length ? 'pointer' : 'default'}
        height={height}
        padding={padding}
        justifyContent='center'
        backgroundColor={backgroundColor}
        position='relative'
        onClick={() => setOpened(!opened)}
        ref={inputRef}
      >
        <StyledSelect
          onChange={e => onClick(e.currentTarget.value)}
          width={['100%', '100%', 0]}
          height={['100%', '100%', 0]}
        >
          {items &&
            items
              .filter(item => typeof item === 'string')
              .map(optionItem => <option value={optionItem}>{optionItem}</option>)}
        </StyledSelect>
        <Text
          color={items && items.length ? color || 'dustyGray' : 'listGray'}
          fontSize='medium'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {value}
        </Text>
        <Condition match={!backgroundColor}>
          <Layout flexBasis='16px' />
          <Divider color='dividerGray' />
        </Condition>
        <Box position='absolute' top={cursorTop || '9px'} right={cursorRight || '0px'}>
          <BmwSelectIcon width='10px' height='6px' color={items && items.length ? '' : '#767676'} />
        </Box>
        <LiveTyping
          items={items && items.filter(item => typeof item === 'string')}
          opened={opened}
          select
          liveTypingWidth={liveTypingWidth}
          left={liveTypingLeft}
          onClose={() => setOpened(false)}
          onClick={onClick}
          backgroundColor='slightlyGray'
          top={liveTop || '37px'}
        />
      </Transition>
    </>
  )
}

export default BMWBlockSelect
