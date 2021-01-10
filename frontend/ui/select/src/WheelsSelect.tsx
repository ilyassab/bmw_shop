import styled                                     from '@emotion/styled'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Box }                                    from '@atlantis-lab/layout'
import { layout }                                 from 'styled-system'

import { BmwSelectIcon }                          from '@ui/icons'
import { LiveTyping }                             from '@ui/live-typing'
import { Text }                                   from '@ui/text'
import { Transition }                             from '@ui/transition'

interface Props {
  offers?: Array<{
    vendorCode?: string
    id?: number[]
    isDiscount?: boolean
    oldPrice?: number
    parameters?: Array<{
      code?: string
      name?: string
      value?: string
    }>
    store?: Array<{
      address?: string
      externalId?: number
      id?: number
      location?: string
      name?: string
      phone?: string
      quantity?: number
      worktime?: string
    }>
    price?: number
    quantity?: number
  }>
  currentOffer: {
    vendorCode?: string
    id?: number[]
    isDiscount?: boolean
    oldPrice?: number
    parameters?: Array<{
      code?: string
      name?: string
      value?: string
    }>
    store?: Array<{
      address?: string
      externalId?: number
      id?: number
      location?: string
      name?: string
      phone?: string
      quantity?: number
      worktime?: string
    }>
    price?: number
    quantity?: number
  }
  setOffer?: (arg0: any) => void
}

const StyledSelect = styled.select(
  {
    opacity: 0,
    position: 'absolute',
    left: '0px',
  },
  layout
)

const WheelsSelect: FC<Props> = ({ offers, currentOffer, setOffer }) => {
  const [opened, setOpened] = useState(false)
  const inputRef = useRef(null)

  const handleClickOutside = event => {
    if (inputRef && inputRef.current && !inputRef.current.contains(event.target)) {
      setOpened(false)
    }
  }

  const onClick = item => {
    const offerItem = offers.find(offer => offer.parameters[0].value === item)
    setOffer(offerItem)
  }

  const itemValues = []

  for (let i = 0; i < offers.length; i += 1) {
    itemValues.push(offers[i].parameters[0].value)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  if (itemValues.length === 1) {
    return (
      <Text
        overflow='hidden'
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        fontWeight='normal'
        fontSize='medium'
      >
        {currentOffer && currentOffer.parameters && currentOffer.parameters[0].value}
      </Text>
    )
  }

  return (
    <>
      <Transition
        flexDirection='column'
        boxSizing='border-box'
        width={['100%', '300px', '384px']}
        cursor={offers && offers.length > 1 ? 'pointer' : 'default'}
        height='60px'
        padding='0 30px 0 20px'
        justifyContent='center'
        backgroundColor='inputGray'
        position='relative'
        onClick={() => {
          if (offers && offers.length > 1) {
            setOpened(!opened)
          }
        }}
        ref={inputRef}
      >
        <StyledSelect
          onChange={e => onClick(e.currentTarget.value)}
          width={['100%', '100%', 0]}
          height={['100%', '100%', 0]}
        >
          {itemValues &&
            itemValues
              .filter(item => typeof item === 'string')
              .map(optionItem => <option value={optionItem}>{optionItem}</option>)}
        </StyledSelect>
        <Text
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          fontWeight='normal'
          fontSize='medium'
        >
          {currentOffer && currentOffer.parameters && currentOffer.parameters[0].value}
        </Text>
        <Box position='absolute' top='28px' right='15px'>
          <BmwSelectIcon width='9px' height='5px' />
        </Box>
        <LiveTyping
          items={itemValues}
          opened={opened}
          select
          onClose={() => setOpened(false)}
          onClick={onClick}
          backgroundColor='slightlyGray'
          top='60px'
        />
      </Transition>
    </>
  )
}

export default WheelsSelect
