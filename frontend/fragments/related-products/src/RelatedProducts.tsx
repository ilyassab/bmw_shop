import React, { FC, useEffect, useState }    from 'react'
import { Carousel }                          from '@atlantis-lab/carousel'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'
import { useRouter }                         from 'next/router'

import { SliderItem }                        from '@fragments/slider-item'
import { Loader }                            from '@ui/loader'
import { Text }                              from '@ui/text'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData }                           from './useData'

interface Props {
  isMobile?: boolean
}

const RelatedProducts: FC<WrappedComponentProps & Props> = ({ isMobile, intl }) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const router = useRouter()
  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const token = cookieStorage.getItem('token') || ''
        setLoading(true)
        const data = await useData(client, router && router.query && router.query.item, token)
        setLoading(false)
        setProducts(data)
      } catch {
        setLoading(false)
      }
    }
    fetchQuery()
  }, [])

  if (loading) {
    return (
      <Box height={['272px', '400px', '400px']} justifyContent='center' alignItems='center'>
        <Loader />
      </Box>
    )
  }

  return (
    <Layout justifyContent='center' width='100%'>
      <Layout flexGrow={1} backgroundColor='white' zIndex={3} />
      <Box maxWidth={['100%', '100%', '1200px']} width='100%'>
        <Column height='100%'>
          <Layout justifyContent={['center', 'center', 'flex-start']}>
            <Layout width='100%' maxWidth='90%' display={['none', 'flex', 'flex']}>
              <Text
                color='semiBlack'
                fontSize={['semiLarge', 'large', 'xlarge']}
                fontWeight='tiny'
                lineHeight='small'
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.withThisOffer)}
              </Text>
            </Layout>
            <Layout width='100%' maxWidth='90%' display={['flex', 'none', 'none']}>
              <Text
                color='semiBlack'
                fontSize={['semiLarge', 'large', 'xlarge']}
                fontWeight='tiny'
                lineHeight='small'
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.closeOffers)}
              </Text>
            </Layout>
          </Layout>
          <Layout flexBasis={['20px', '20px', '40px']} />
          <Box width='100%' ml={['5%', '5%', '0']}>
            <Carousel disableButton={isMobile || products.length <= 4} step={4} halfControls>
              {products.map(slide => (
                <Box key={slide.name} position='relative'>
                  <SliderItem isMobile={isMobile} item={slide} />
                </Box>
              ))}
            </Carousel>
          </Box>
        </Column>
      </Box>
      <Layout flexGrow={1} backgroundColor='white' zIndex={3} />
    </Layout>
  )
}

export default injectIntl(RelatedProducts)
