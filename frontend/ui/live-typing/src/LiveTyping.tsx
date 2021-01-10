import styled                  from '@emotion/styled'
import React, { FC, Fragment } from 'react'
import { Column, Layout, Row } from '@atlantis-lab/layout'
import { switchProp }          from 'styled-tools'

import { Condition }           from '@ui/condition'
import { Divider }             from '@ui/divider'
import { NoScrollbar }         from '@ui/no-scrollbar'
import { Space, Text }         from '@ui/text'

interface Props {
  items?: any
  onClose?: () => void
  onClick?: (arg0?: any) => void
  opened?: boolean
  select?: boolean
  backgroundColor?: string
  hoverType?: string
  top?: number | string
  liveTypingWidth?: string | string[]
  left?: number | string | number[]
}

const LiveTypingItemUI = styled.div<any>(
  {
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: '0.5s',
  },
  switchProp('hoverType', {
    default: {
      ':hover': {
        transform: 'translate(10px, 0)',
      },
    },
    bmw: {
      transition: '0.15s',
      ':hover': {
        borderLeft: '2px solid blue',
      },
    },
  })
)

export const LiveTyping: FC<Props> = ({
  opened,
  onClick,
  items,
  select,
  hoverType = 'default',
  onClose,
  backgroundColor,
  liveTypingWidth,
  top,
  left = '0',
}) => (
  <NoScrollbar
    backgroundColor={backgroundColor || 'white'}
    width={liveTypingWidth || '100%'}
    zIndex={10}
    /* eslint-disable no-nested-ternary */
    maxHeight={opened ? (select ? ['0', '0', '220px'] : '220px') : '0'}
    position='absolute'
    top={top || 60}
    left={left}
    boxShadow='motionGray'
    overflowX='hidden'
  >
    <Column>
      {items &&
        items.map((item, index) => (
          <Fragment key={(item && item.code) || `${item}${index}`}>
            <LiveTypingItemUI
              onClick={() => {
                onClick(item)
                if (onClose) {
                  onClose()
                }
              }}
              hoverType={hoverType}
            >
              <Layout justifyContent='center'>
                <Layout flexShrink={0} flexBasis='20px' />
                <Column maxWidth='100%'>
                  <Layout flexBasis='16px' />
                  <Row overflow='hidden'>
                    <Condition match={item.name}>
                      <Text
                        fontSize='semiMedium'
                        fontWeight='normal'
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    </Condition>
                    <Condition match={!item.name}>
                      <Text
                        fontSize='semiMedium'
                        fontWeight='normal'
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    </Condition>
                    <Condition match={item.region}>
                      <Space count={2} />
                      <Text
                        whiteSpace='nowrap'
                        fontSize='semiMedium'
                        fontWeight='normal'
                        color='motionGray'
                      >
                        ({item.region})
                      </Text>
                    </Condition>
                  </Row>
                  <Layout flexBasis='16px' />
                </Column>
              </Layout>
            </LiveTypingItemUI>
            <Layout>
              <Divider color='dividerGray' />
            </Layout>
          </Fragment>
        ))}
    </Column>
  </NoScrollbar>
)
