import styled                            from '@emotion/styled'
import React, { useEffect, useState }    from 'react'
import { Box, Layout }                   from '@atlantis-lab/layout'

import { ArrowLeftIcon, ArrowRightIcon } from '@ui/icons'
import { Transition }                    from '@ui/transition'

import { ProgressLoader }                from './ProgressLoader'
import { SlideshowButton }               from './SlideshowButton'

const SlideshowUI = styled.div<any>(({ active }) => ({
  transition: active ? '0.4s' : '1s',
  position: 'absolute',
  width: '100%',
  top: 0,
  right: 0,
}))

export const MainSlideshow = ({
  children,
  height,
  setCurrentSlideIndex,
  setPrevSlideIndex,
  setCurrentDirection,
}) => {
  const [slide, setSlide] = useState(0)
  const [offset, setOffset] = useState(0)
  const [start, setStart] = useState(true)
  const [actionBlocked, setActionBlocked] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActionBlocked(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [actionBlocked])

  useEffect(() => {
    setCurrentSlideIndex(slide)
  }, [slide])

  useEffect(() => {
    let timeout = null
    if (offset < 184 && start) {
      timeout = setTimeout(() => {
        setOffset(offset + 2.5)
      }, 80)
    } else if (offset >= 184 && start) {
      setActionBlocked(true)
      setCurrentDirection('right')
      setPrevSlideIndex(slide)
      if (slide !== children.length - 1) {
        setSlide(slide + 1)
      } else if (slide === children.length - 1) {
        setSlide(0)
      }
      setOffset(-10)
    }
    return () => clearTimeout(timeout)
  }, [offset, start])
  /* eslint-disable */
  return (
    <Box position='relative' height={height} mt='-120px'>
      {children.map((item, index) => (
        <SlideshowUI key={index} active={slide === index}>
          {item}
          <Layout justifyContent='center' width='100%'>
            <Box
              opacity={slide === index ? 1 : 0}
              position='relative'
              width='100%'
              maxWidth={['90%', '90%', '1200px']}
            >
              <SlideshowButton
                direction='left'
                onClick={() => {
                  if (!actionBlocked) {
                    setActionBlocked(true)
                    setCurrentDirection('left')
                    setPrevSlideIndex(slide)
                    if (slide > 0) {
                      setSlide(slide - 1)
                      setOffset(-5)
                    } else if (slide === 0) {
                      setSlide(children.length - 1)
                      setOffset(-5)
                    }
                  }
                }}
                onMouseEnter={() => setStart(false)}
                onMouseLeave={() => setStart(true)}
              >
                <Transition>
                  <ArrowLeftIcon
                    color={!start ? 'rgba(255, 255, 255, 0.5)' : ''}
                    width='12px'
                    height='15px'
                  />
                </Transition>
              </SlideshowButton>
              <SlideshowButton
                direction='right'
                onClick={() => {
                  if (!actionBlocked) {
                    setActionBlocked(true)
                    setCurrentDirection('right')
                    setPrevSlideIndex(slide)
                    if (slide !== children.length - 1) {
                      setSlide(slide + 1)
                      setOffset(-5)
                    } else if (slide === children.length - 1) {
                      setSlide(0)
                      setOffset(-5)
                    }
                  }
                }}
                onMouseEnter={() => setStart(false)}
                onMouseLeave={() => setStart(true)}
              >
                <ProgressLoader strokeDashoffset={220 - offset} />
                <Box position='absolute'>
                  <Transition>
                    <ArrowRightIcon
                      color={!start ? 'rgba(255, 255, 255, 0.5)' : ''}
                      width='12px'
                      height='15px'
                    />
                  </Transition>
                </Box>
              </SlideshowButton>
            </Box>
          </Layout>
        </SlideshowUI>
      ))}
    </Box>
  )
  /* eslint-enable */
}
