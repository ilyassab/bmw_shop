import React, { FC, Fragment, useState } from 'react'
import { Box, Column, Layout, Row }      from '@atlantis-lab/layout'
import { useIntl }                       from 'react-intl'

import { BikeModal }                     from '@fragments/bike-modal'
import { HatModal }                      from '@fragments/hat-modal'
import { SizeModal }                     from '@fragments/size-modal'
import { Condition }                     from '@ui/condition'
import { Divider }                       from '@ui/divider'
import { HowToSizeModal }                from '@ui/how-to-size-modal'
import { HoverText, Space, Text }        from '@ui/text'

import messages                          from './messages'

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
    price?: number
    quantity?: number
  }>
  currentOffer?: {
    vendorCode?: string
    id?: number[]
    isDiscount?: boolean
    oldPrice?: number
    parameters?: Array<{
      code?: string
      name?: string
      value?: string
    }>
    price?: number
    quantity?: number
  }
  setOffer?: (arg0?: any) => void
  setCanClose?: (arg0?: any) => void
  sizeTable?: string
}

export const SizePicker: FC<Props> = ({
  offers,
  setCanClose,
  currentOffer,
  setOffer,
  sizeTable,
}) => {
  const intl = useIntl()
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [sizeModalOpened, setSizeModalOpened] = useState(false)
  const [bikeModalOpened, setBikeModalOpened] = useState(false)
  const [hatModalOpened, setHatModalOpened] = useState(false)
  const [howToModalOpened, setHowToModalOpened] = useState(false)

  if (
    offers &&
    offers[0] &&
    offers[0].parameters &&
    (offers[0].parameters.length < 1 || offers[0].parameters[0].value === '')
  ) {
    return null
  }

  return (
    <Column>
      <Divider color='semiGray' />
      <Layout flexBasis='24px' />
      <Text color='semiBlack' fontSize='small' fontWeight='semiBold' textTransform='uppercase'>
        {intl.formatMessage(messages.size)}
      </Text>
      <Layout flexBasis='14px' />
      <Row>
        {offers.map((item, index) => (
          <Fragment key={item.id && item.id[0]}>
            <Text cursor='pointer' onClick={() => setOffer(item)}>
              <Box
                width='40px'
                height='40px'
                backgroundColor={item.quantity < 1 ? 'slightlyGray' : 'white'}
                border={
                  /* eslint-disable no-nested-ternary */
                  (item.id && item.id[0]) === (currentOffer.id && currentOffer.id[0])
                    ? 'solidBlack'
                    : hoveredIndex === index
                    ? 'hoveredGray'
                    : 'solidGray'
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                alignItems='center'
                justifyContent='center'
              >
                <Text
                  fontSize='small'
                  fontWeight='normal'
                  color={item.quantity < 1 ? 'dustyGray' : 'semiBlack'}
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                >
                  {item.parameters && item.parameters[0] && item.parameters[0].value}
                </Text>
              </Box>
            </Text>
            <Layout flexBasis='12px' />
          </Fragment>
        ))}
      </Row>
      <Layout flexBasis='24px' />
      <Box flexDirection={['column', 'row', 'row']}>
        <Condition
          match={
            sizeTable.includes('hat-sizes') ||
            sizeTable.includes('bike-size') ||
            sizeTable.includes('closes-size')
          }
        >
          <Box
            onClick={() => {
              if (setCanClose) {
                setCanClose(false)
              }
              if (sizeTable.includes('hat-sizes')) {
                setHatModalOpened(true)
              }
              if (sizeTable.includes('bike-size')) {
                setBikeModalOpened(true)
              }
              if (sizeTable.includes('closes-size')) {
                setSizeModalOpened(true)
              }
            }}
          >
            <HoverText fontSize='small' color='blue' fontWeight='normal' underline>
              {intl.formatMessage(messages.tableSize)}
            </HoverText>
            <Space />
          </Box>
        </Condition>
        <Layout flexBasis={['5px', '0px', '0px']} />
        <Condition match={sizeTable.includes('closes-size')}>
          <Box
            onClick={() => {
              if (setCanClose) {
                setCanClose(false)
              }
              setHowToModalOpened(true)
            }}
          >
            <HoverText fontSize='small' color='blue' fontWeight='normal' underline>
              {intl.formatMessage(messages.howTo)}
            </HoverText>
          </Box>
        </Condition>
      </Box>
      <SizeModal
        opened={sizeModalOpened}
        onClose={() => {
          if (setCanClose) {
            setCanClose(true)
          }
          setSizeModalOpened(false)
        }}
      />
      <BikeModal
        opened={bikeModalOpened}
        onClose={() => {
          if (setCanClose) {
            setCanClose(true)
          }
          setBikeModalOpened(false)
        }}
      />
      <HatModal
        opened={hatModalOpened}
        onClose={() => {
          if (setCanClose) {
            setCanClose(true)
          }
          setHatModalOpened(false)
        }}
      />
      <HowToSizeModal
        opened={howToModalOpened}
        onClose={() => {
          if (setCanClose) {
            setCanClose(true)
          }
          setHowToModalOpened(false)
        }}
      />
    </Column>
  )
}
