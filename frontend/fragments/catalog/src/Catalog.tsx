import React, { FC }                         from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { CatalogItem }                       from '@fragments/catalog-item'
import { TabSwitcher }                       from '@fragments/tab-switcher'
import { ShowMoreButton }                    from '@ui/button'
import { Condition }                         from '@ui/condition'
import { NextLink }                          from '@ui/link'
import { Loader }                            from '@ui/loader'
import { Text }                              from '@ui/text'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData }                           from './useData'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const Catalog: FC<WrappedComponentProps & Props> = ({ intl, block, isTablet, isMobile }) => {
  /* eslint-disable no-nested-ternary */
  const showItems = isTablet ? 6 : isMobile ? 3 : 8

  const token = cookieStorage.getItem('token') || ''
  const { state, setState, loading } = useData(showItems, block, token)

  return (
    <Layout justifyContent='center' backgroundColor='white'>
      <Box maxWidth={['90%', '90%', '1200px']} width='100%'>
        <Column>
          <Text
            color='semiBlack'
            fontSize={['semiLarge', 'large', 'xlarge']}
            fontWeight='tiny'
            lineHeight='normal'
            textTransform='uppercase'
          >
            {intl.formatMessage(messages.hits)}
          </Text>
          <Condition match={!block}>
            <Layout flexBasis={['16px', '16px', '16px']} />
            <TabSwitcher
              onClick={currentMenu =>
                setState({
                  ...state,
                  page: 1,
                  pages: 1,
                  currentMenu,
                })
              }
              isMobile={isMobile}
            />
          </Condition>
          <Layout flexBasis={['32px', '48px', '48px']} />
          <Layout flexWrap='wrap'>
            {state.items.map(item => (
              <Layout width={['100%', '33.33%', '300px']} position='relative' key={item.slug}>
                <CatalogItem item={item} isMobile={isMobile} />
              </Layout>
            ))}
          </Layout>
          <Layout flexBasis={['16px', '40px', '40px']} />
          <Condition match={state.page <= state.pages && !loading}>
            <NextLink
              href={`/catalog/${state.currentMenu}`}
              as={`/catalog/${state.currentMenu}`}
              color='semiBlack'
              fontSize='semiMedium'
              fontWeight='semiBold'
            >
              <ShowMoreButton
                height='60px'
                width='100%'
                justifyContent='center'
                alignItems='center'
              >
                {intl.formatMessage(messages.showMore)}
              </ShowMoreButton>
            </NextLink>
          </Condition>
          <Condition match={loading}>
            <Box height='60px' width='100%' justifyContent='center' alignItems='center'>
              <Loader />
            </Box>
          </Condition>
        </Column>
      </Box>
    </Layout>
  )
}

export default injectIntl(Catalog)
