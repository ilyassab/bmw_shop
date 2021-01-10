import React, { FC, useEffect, useState } from 'react'
import { Layout, Row }                    from '@atlantis-lab/layout'
import { useRouter }                      from 'next/router'
import { useIntl }                        from 'react-intl'

import { Button }                         from '@ui/button'
import { Condition }                      from '@ui/condition'
import { CrossIcon }                      from '@ui/icons'
import { Text }                           from '@ui/text'
import { Transition }                     from '@ui/transition'
import { filterParser }                   from '@utils/filter-parser'

import messages                           from './messages'

interface Props {
  noMarginTop?: boolean
}

export const ResetFilters: FC<Props> = () => {
  const intl = useIntl()
  const router: any = useRouter()
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
    <Condition match={query.filters || query.price}>
      <Button
        height='60px'
        backgroundColor='slightlyGray'
        onClick={() => {
          filterParser.resetPriceAndFilters()
        }}
      >
        <Row justifyContent='center' alignItems='flex-end'>
          <Transition transform='rotate(45deg)'>
            <CrossIcon width='15px' height='15px' />
          </Transition>
          <Layout flexBasis='8px' />
          <Text lineHeight='small' fontWeight='semiBold' fontSize='semiMedium'>
            {intl.formatMessage(messages.clearAll)}
          </Text>
        </Row>
      </Button>
      <Layout flexBasis='32px' />
    </Condition>
  )
}
