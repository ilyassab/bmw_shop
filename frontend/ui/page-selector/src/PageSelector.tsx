import React, { FC, Fragment }        from 'react'
import { Button }                     from '@atlantis-lab/button'
import { Box, Layout, Row }           from '@atlantis-lab/layout'
import { useIntl }                    from 'react-intl'

import { Condition }                  from '@ui/condition'
import { PageNextIcon, PagePrevIcon } from '@ui/icons'
import { Text }                       from '@ui/text'

import messages                       from './messages'

interface Props {
  pages?: number
  currentPage?: number
  loading?: boolean
  setCurrentPage?: (arg0?: number) => void
}

export const PageSelector: FC<Props> = ({ pages, currentPage, loading, setCurrentPage }) => {
  const intl = useIntl()
  /* eslint-disable no-nested-ternary */
  const startPages = currentPage + 4 < pages ? currentPage : pages < 5 ? currentPage : pages - 4

  const scrolling = () => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const Blocks = []
  for (let i = startPages; i <= pages && i < currentPage + 5; i += 1) {
    Blocks.push(
      <Fragment key={i}>
        <Button
          minWidth={['42px', '48px', '48px']}
          height={['42px', '48px', '48px']}
          backgroundColor={currentPage === i ? 'buttonGray' : 'white'}
          borderRadius='none'
          hoverBackgroundColor={currentPage === i ? 'buttonGray' : 'inputGray'}
          onClick={() => {
            setCurrentPage(i)
            scrolling()
          }}
        >
          <Text
            color={currentPage === i ? 'white' : 'semiBlack'}
            fontSize='medium'
            fontWeight='semiBold'
          >
            {i}
          </Text>
        </Button>
        <Layout flexBasis='5px' />
      </Fragment>
    )
  }

  return (
    <Row width='100%' justifyContent='flex-end' position='relative'>
      <Condition match={loading}>
        <Box
          position='absolute'
          width='100%'
          height='100%'
          zIndex='10'
          backgroundColor='coverWhite'
        />
      </Condition>
      <Condition match={currentPage > 1}>
        <Box
          alignItems='center'
          display={['flex', 'none', 'none']}
          onClick={() => {
            setCurrentPage(currentPage - 5 > 0 ? currentPage - 5 : 1)
            scrolling()
          }}
        >
          <PagePrevIcon width='24px' height='24px' />
        </Box>
        <Box display={['none', 'flex', 'flex']}>
          <Button
            width='104px'
            height='48px'
            backgroundColor='inputGray'
            borderRadius='none'
            onClick={() => {
              setCurrentPage(currentPage - 5 > 0 ? currentPage - 5 : 1)
              scrolling()
            }}
          >
            <Text color='semiBlack' fontSize='medium' fontWeight='semiBold'>
              {intl.formatMessage(messages.back)}
            </Text>
          </Button>
        </Box>
        <Layout flexBasis={['8px', '24px', '24px']} />
      </Condition>
      {Blocks}
      <Condition match={pages - currentPage >= 5}>
        <Layout flexBasis={['8px', '24px', '24px']} />
        <Box display={['none', 'flex', 'flex']}>
          <Button
            width='104px'
            height='48px'
            backgroundColor='inputGray'
            borderRadius='none'
            onClick={() => {
              setCurrentPage(currentPage + 5)
              scrolling()
            }}
          >
            <Text color='semiBlack' fontSize='medium' fontWeight='semiBold'>
              {intl.formatMessage(messages.forward)}
            </Text>
          </Button>
        </Box>
        <Box
          alignItems='center'
          display={['flex', 'none', 'none']}
          onClick={() => {
            setCurrentPage(currentPage + 5)
            scrolling()
          }}
        >
          <PageNextIcon width='24px' height='24px' />
        </Box>
      </Condition>
    </Row>
  )
}
