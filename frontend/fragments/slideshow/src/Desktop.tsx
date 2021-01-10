import React, { FC, Fragment, useState } from 'react'
import { Box, Layout }                   from '@atlantis-lab/layout'

import { Background }                    from '@ui/background'
import { Button }                        from '@ui/button'
import { NextLink }                      from '@ui/link'
import { Loader }                        from '@ui/loader'
import { MainGradient, MainSlideshow }   from '@ui/main-slideshow'
import { Text }                          from '@ui/text'
import { Transition }                    from '@ui/transition'

import { useData }                       from './useData'

const Desktop: FC = () => {
  const { sliderData, loading } = useData()
  const [slideIndex, setSlideIndex] = useState(0)
  const [prevSlideIndex, setPrevSlideIndex] = useState(null)
  const [currentDirection, setCurrentDirection] = useState('right')

  if (loading) {
    return (
      <Box height='560px' justifyContent='center' alignItems='center'>
        <Loader />
      </Box>
    )
  }

  return (
    <MainSlideshow
      height='100vh'
      setCurrentSlideIndex={setSlideIndex}
      setPrevSlideIndex={setPrevSlideIndex}
      setCurrentDirection={setCurrentDirection}
    >
      {sliderData.map((slide, index) => (
        <Fragment key={slide.image}>
          <Transition
            justifyContent={
              /* eslint-disable no-nested-ternary */
              currentDirection === 'right'
                ? slideIndex === index
                  ? 'flex-end'
                  : 'flex-start'
                : slideIndex === index
                ? 'flex-start'
                : 'flex-end'
            }
            width='100%'
          >
            <Background
              key={slide.image}
              transition='width 0.35s, background-position 1.7s'
              height='100vh'
              width={slideIndex === index ? '100%' : '0%'}
              backgroundColor='dustyGray'
              backgroundPosition={
                prevSlideIndex === null && sliderData.length - 1 === index
                  ? '65%'
                  : prevSlideIndex === index && currentDirection === 'right'
                  ? '65%'
                  : prevSlideIndex === index && currentDirection === 'left'
                  ? '35%'
                  : slideIndex === index
                  ? '50%'
                  : currentDirection === 'right'
                  ? '35%'
                  : '65%'
              }
              backgroundSize='cover'
              backgroundImage={`url(${slide.image})`}
              justifyContent='center'
            />
          </Transition>
          <Transition width='100%' justifyContent='center' opacity={slideIndex === index ? 1 : 0}>
            <MainGradient top />
            <MainGradient bottom />
            <Box
              maxWidth={['90%', '90%', '1200px']}
              width='100%'
              height='100%'
              zIndex={8}
              position='relative'
            >
              <Box bottom={['80px', '80px', '80px']} position='absolute' flexDirection='column'>
                <Box overflow='hidden' width={['288px', '590px', '690px']}>
                  <Transition
                    transition='0.5s'
                    transform={
                      /* eslint-disable no-nested-ternary */
                      prevSlideIndex === index && currentDirection === 'right'
                        ? 'translateY(-140px)'
                        : prevSlideIndex === index && currentDirection === 'left'
                        ? 'translateY(140px)'
                        : slideIndex === index
                        ? 'translateY(0px)'
                        : prevSlideIndex === null && sliderData.length - 1 === index
                        ? 'translateY(-140px)'
                        : currentDirection === 'right'
                        ? 'translateY(140px)'
                        : 'translateY(-140px)'
                    }
                  >
                    <Text
                      fontSize={['large', 'xlarge', 'huge']}
                      lineHeight='regular'
                      fontWeight='tiny'
                      color={slide.color}
                    >
                      {slide.title}
                    </Text>
                  </Transition>
                </Box>
                <Layout flexBasis={['24px', '24px', '40px']} />
                <Layout>
                  <NextLink
                    href={slide.buttonLink}
                    color='black'
                    hoverColor='blue'
                    clickedColor='darkBlue'
                    fontSize='semiMedium'
                    fontWeight='semiBold'
                  >
                    <Button
                      height='60px'
                      padding='0px 41px'
                      backgroundColor='white'
                      borderRadius='none'
                    >
                      {slide.buttonText}
                    </Button>
                  </NextLink>
                </Layout>
              </Box>
            </Box>
          </Transition>
        </Fragment>
      ))}
    </MainSlideshow>
  )
}

export default Desktop
