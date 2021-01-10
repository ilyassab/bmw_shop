/* eslint-disable */
import React, { FC, Fragment, useEffect, useState } from 'react'
import { Box, Layout }                              from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl }        from 'react-intl'
import { useApolloClient }                          from '@apollo/react-hooks'

import { Link }                                     from '@ui/link'
import { Text }                                     from '@ui/text'

import messages                                     from './messages'
import { useData }                                  from './useData'

/* eslint-enable */

const Footer: FC<WrappedComponentProps> = ({ intl }) => {
  const [items, setItems] = useState([])

  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const footerItems = await useData(client)
        setItems(footerItems)
      } catch {
        setItems([])
      }
    }
    fetchQuery()
  }, [])

  return (
    <Layout width='100%' height='68px' backgroundColor='blackBright' justifyContent='center'>
      <Box alignItems='center' maxWidth={['90%', '90%', '1200px']} width='100%'>
        <Layout width='100%' display={['none', 'none', 'flex']}>
          {items.map(item => (
            <Fragment key={item.name + item.url}>
              <Link
                href={item.url}
                color='dustyGray'
                hoverColor='slightlyGray'
                clickedColor='crumbsGray'
                fontSize='semiMedium'
                fontWeight='small'
              >
                {item.name}
              </Link>
              <Layout flexBasis='24px' />
            </Fragment>
          ))}
          <Layout flexGrow={1} />
          <Link href='https://hmns.ru' color='white' fontSize='semiMedium' fontWeight='medium'>
            {intl.formatMessage(messages.hmns)}
          </Link>
          <Layout flexBasis='5px' />
          <Text color='dustyGray' fontSize='semiMedium' fontWeight='small'>
            {intl.formatMessage(messages.design)}
          </Text>
          <Layout flexBasis='32px' />
        </Layout>
        <Text whiteSpace='nowrap' color='dustyGray' fontSize='semiMedium' fontWeight='small'>
          {intl.formatMessage(messages.bmwIcon)}
        </Text>
      </Box>
    </Layout>
  )
}

export default injectIntl(Footer)
