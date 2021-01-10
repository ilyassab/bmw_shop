import React, { FC }        from 'react'
import { Box, Layout, Row } from '@atlantis-lab/layout'
import { useIntl }          from 'react-intl'

import { Input }            from '@ui/input'
import { Text }             from '@ui/text'
import { Transition }       from '@ui/transition'

interface Props {
  minNumber?: number
  minValue?: number
  maxNumber?: number
  maxValue?: number
  rowRef?: any
  leftClicked?: boolean
  mouseDown?: (arg0?: string) => void
  leftButton?: any
  rangeRef?: any
  rightClicked?: boolean
  rightButton?: any
}

export const Slider: FC<Props> = ({
  minNumber,
  minValue,
  maxNumber,
  maxValue,
  rowRef,
  leftClicked,
  mouseDown,
  leftButton,
  rangeRef,
  rightClicked,
  rightButton,
}) => {
  const intl = useIntl()
  /* eslint-enable */
  return (
    <>
      <Row>
        <Input
          width='100px'
          height='40px'
          backgroundColor='alto'
          border='none'
          padding='0 12px'
          fontSize='semiMedium'
          value={minNumber && intl.formatNumber(minValue)}
          disabled
          placeholder={`${intl.formatNumber(minValue)}`}
        />
        <Layout flexGrow={1} />
        <Input
          width='100px'
          height='40px'
          backgroundColor='alto'
          border='none'
          padding='0 12px'
          fontSize='semiMedium'
          value={maxNumber && intl.formatNumber(maxValue)}
          disabled
          placeholder={`${intl.formatNumber(maxValue)}`}
        />
      </Row>
      <Layout flexBasis='16px' />
      <Row position='relative' ref={rowRef}>
        <Text cursor='pointer'>
          <Transition
            borderRadius='giant'
            transform={leftClicked ? 'scale(1.2)' : ''}
            top='-7px'
            minHeight='16px'
            minWidth='16px'
            transition='0.15s linear'
            backgroundColor='semiBlack'
            position='absolute'
            onMouseDown={() => mouseDown('left')}
            onTouchStart={() => mouseDown('left')}
            onDragStart={e => e.preventDefault()}
            ref={leftButton}
          />
        </Text>
        <Box width='100%' backgroundColor='inputGray' height='2px' />
        <Transition
          transition='0.15s linear'
          position='absolute'
          backgroundColor='semiBlack'
          ref={rangeRef}
          right={0}
          left={0}
          height='2px'
        />
        <Text cursor='pointer'>
          <Transition
            borderRadius='giant'
            position='absolute'
            transition='0.15s linear'
            transform={rightClicked ? 'scale(1.2)' : ''}
            top='-7px'
            right='0px'
            minHeight='16px'
            minWidth='16px'
            onMouseDown={() => mouseDown('right')}
            onTouchStart={() => mouseDown('right')}
            onDragStart={e => e.preventDefault()}
            backgroundColor='semiBlack'
            ref={rightButton}
          />
        </Text>
      </Row>
    </>
  )
}
