import React, { FC }   from 'react'
import { Box, Layout } from '@atlantis-lab/layout'
import { Slideshow }   from '@atlantis-lab/slideshow'

import { Background }  from '@ui/background'
import { Button }      from '@ui/button'
import { NextLink }    from '@ui/link'
import { Text }        from '@ui/text'
import { useResize }   from '@utils/resize'

import { useData }     from './useData'

const Mobile: FC = () => {
  const { sliderData } = useData()

  let width = 0

  if (process.browser) {
    ;[width] = useResize()
  }

  if (sliderData.length === 0) {
    return <Box width={width} height={['520px', '640px', '640px']} />
  }

  return (
    <Slideshow
      time={8000}
      width={`${width}px`}
      height={['520px', '640px', '640px']}
      transition='0.35s'
    >
      {sliderData.map(slide => (
        <Background
          key={slide.image}
          width={width}
          height={['520px', '640px', '640px']}
          backgroundColor='dustyGray'
          backgroundPosition='center'
          backgroundSize='cover'
          backgroundImage={`url(${slide.image})`}
          justifyContent='center'
        >
          <Box
            maxWidth={['90%', '90%', '1200px']}
            width='100%'
            height='100%'
            zIndex={8}
            position='relative'
          >
            <Box
              width='100%'
              bottom={['50px', '63px', '80px']}
              position='absolute'
              flexDirection='column'
            >
              <Layout width={['288px', '590px', '690px']}>
                <Text
                  fontSize={['large', 'xlarge', 'huge']}
                  overflow='hidden'
                  textOverflow='ellipsis'
                  lineHeight='regular'
                  fontWeight={['small', 'tiny', 'tiny']}
                  color={slide.color}
                >
                  {slide.title}
                </Text>
              </Layout>
              <Layout flexBasis={['24px', '24px', '40px']} />
              <Layout>
                <NextLink
                  href={slide.buttonLink}
                  color='black'
                  hoverColor='blue'
                  fontSize='semiMedium'
                  fontWeight='semiBold'
                  width='100%'
                >
                  <Button
                    height='60px'
                    width={['100%', 'auto', 'auto']}
                    padding='0px 41px'
                    backgroundColor='white'
                  >
                    {slide.buttonText}
                  </Button>
                </NextLink>
              </Layout>
            </Box>
          </Box>
        </Background>
      ))}
    </Slideshow>
  )
}

export default Mobile
