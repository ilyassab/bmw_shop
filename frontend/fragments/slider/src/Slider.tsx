import React, { FC }                from 'react'
import { Carousel }                 from '@atlantis-lab/carousel'
import { Box, Column, Layout, Row } from '@atlantis-lab/layout'

import { SliderItem }               from '@fragments/slider-item'
import { Condition }                from '@ui/condition'
import { ArrowRightIcon }           from '@ui/icons'
import { NextLink }                 from '@ui/link'
import { Loader }                   from '@ui/loader'
import { Space, Text }              from '@ui/text'

import { useData }                  from './useData'

interface Props {
  iblock?: string
  isMobile?: boolean
}

const Slider: FC<Props> = ({ isMobile, iblock }) => {
  const { productList, loading } = useData(iblock)

  if (loading) {
    return (
      <Box height={['272px', '400px', '400px']} justifyContent='center' alignItems='center'>
        <Loader />
      </Box>
    )
  }

  return (
    <Layout justifyContent='center' width='100vw' maxWidth='100%'>
      <Layout flexGrow={1} backgroundColor='white' zIndex={3} />
      <Box maxWidth='1200px' width='100%'>
        <Column height='100%'>
          <Row alignSelf='center' maxWidth={['90%', '90%', '1200px']} alignItems='flex-end'>
            <Text
              color='semiBlack'
              fontSize={['semiLarge', 'large', 'xlarge']}
              fontWeight='tiny'
              lineHeight='small'
              textTransform='uppercase'
            >
              {productList.title}
            </Text>
            <Condition match={!isMobile}>
              <Layout flexGrow={1} />
              <Box>
                <NextLink
                  href={`${productList.link.url}`}
                  color='blue'
                  fontSize='semiMedium'
                  fontWeight='semiBold'
                  lineHeight='small'
                  whiteSpace='nowrap'
                  underline
                >
                  {productList.link.title}
                </NextLink>
                <NextLink lineHeight='small' href={`${productList.link.url}`}>
                  <Space count={3} />
                  <Layout mt='2px'>
                    <ArrowRightIcon width='12px' height='12px' color='blue' />
                  </Layout>
                </NextLink>
              </Box>
            </Condition>
          </Row>
          <Layout flexBasis={['20px', '20px', '40px']} />
          <Box width='100%' ml={['5%', '5%', '0']}>
            <Carousel disableButton={isMobile} step={4} halfControls>
              {productList.items.map(slide => (
                <Box key={slide.id} position='relative'>
                  <SliderItem isMobile={isMobile} item={slide} />
                </Box>
              ))}
            </Carousel>
          </Box>
          <Condition match={isMobile}>
            <Layout flexBasis='24px' />
            <Row maxWidth={['90%', '90%', '1200px']} alignSelf='center'>
              <NextLink
                href={`${productList.link.url}`}
                color='blue'
                width='100%'
                fontSize='semiMedium'
                fontWeight='normal'
                lineHeight='small'
              >
                <Row>
                  {productList.link.title}
                  <Layout flexGrow={1} />
                  <ArrowRightIcon width='12px' height='12px' color='blue' />
                </Row>
              </NextLink>
            </Row>
          </Condition>
        </Column>
      </Box>
      <Layout flexGrow={1} backgroundColor='white' zIndex={3} />
    </Layout>
  )
}

export default Slider
