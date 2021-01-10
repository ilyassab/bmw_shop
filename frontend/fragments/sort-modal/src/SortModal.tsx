import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useRouter }                         from 'next/router'

import { Modal }                             from '@atlantis-lab/modal'
import { Divider }                           from '@ui/divider'
import { Text }                              from '@ui/text'
import { filterParser }                      from '@utils/filter-parser'

import messages                              from './messages'

interface Props {
  onClose?: () => void
  opened?: boolean
  intl?: any
}

const SortModal: FC<Props & WrappedComponentProps> = ({ onClose, opened, intl }) => {
  const router = useRouter()
  const [query, setQuery] = useState((router && router.query) || {})

  useEffect(() => {
    const handleRouteChanged = () => {
      if (window && window.history) {
        setQuery(window.history.state.url.query || {})
      }
    }
    router.events.on('routeChangeComplete', handleRouteChanged)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChanged)
    }
  }, [])

  return (
    <Modal visible={opened} onClose={onClose} justifyContent={['flex-end', 'flex-end', 'center']}>
      <Box
        position='relative'
        justifyContent='center'
        height={['100%', '100%', 'auto']}
        width='100%'
        backgroundColor='white'
        maxWidth={['90%', '90%', '800px']}
      >
        <Column width='100%' height='100%'>
          <Box height='64px' boxShadow='gray' alignItems='center'>
            <Layout flexBasis='5%' />
            <Text
              fontSize={['default', 'default', 'large']}
              fontWeight={['semiBold', 'semiBold', 'tiny']}
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.sort)}
            </Text>
          </Box>
          <Column
            onClick={() => {
              filterParser.addSort('')
              onClose()
            }}
          >
            <Layout flexBasis='24px' />
            <Row>
              <Layout flexBasis='5%' />
              <Text
                color={!query.sort ? 'semiBlack' : 'dustyGray'}
                fontSize='small'
                fontWeight='semiBold'
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.popular)}
              </Text>
            </Row>
            <Layout flexBasis='24px' />
          </Column>
          <Divider color='dividerGray' />
          <Column
            onClick={() => {
              filterParser.addSort('ASC')
              onClose()
            }}
          >
            <Layout flexBasis='24px' />
            <Row>
              <Layout flexBasis='5%' />
              <Text
                color={query.sort === 'ASC' ? 'semiBlack' : 'dustyGray'}
                fontSize='small'
                fontWeight='semiBold'
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.upPrice)}
              </Text>
            </Row>
            <Layout flexBasis='24px' />
          </Column>
          <Divider color='dividerGray' />
          <Column
            onClick={() => {
              filterParser.addSort('DESC')
              onClose()
            }}
          >
            <Layout flexBasis='24px' />
            <Row>
              <Layout flexBasis='5%' />
              <Text
                color={query.sort === 'DESC' ? 'semiBlack' : 'dustyGray'}
                fontSize='small'
                fontWeight='semiBold'
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.downPrice)}
              </Text>
            </Row>
            <Layout flexBasis='24px' />
          </Column>
          <Divider color='dividerGray' />
        </Column>
      </Box>
    </Modal>
  )
}

export default injectIntl(SortModal)
