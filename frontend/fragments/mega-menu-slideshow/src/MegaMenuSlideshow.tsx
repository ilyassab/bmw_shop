import React, { FC }   from 'react'
import { Box, Layout } from '@atlantis-lab/layout'
import { Slideshow }   from '@atlantis-lab/slideshow'

import { Background }  from '@ui/background'
import { NextLink }    from '@ui/link'

import { useData }     from './useData'

interface Props {
  currentMenuItem?: string
}

const MegaMenuSlideshow: FC<Props> = ({ currentMenuItem }) => {
  const { slides } = useData(currentMenuItem)

  return (
    <>
      <Layout flexBasis='48px' />
      <Slideshow time={3000} width='390px' height='240px' transition='0.35s'>
        {slides.map(slide => (
          <Background
            key={slide.image}
            width='390px'
            height='240px'
            backgroundColor={slide.color}
            backgroundPosition='center'
            position='relative'
            backgroundSize='cover'
            backgroundImage={`url(${slide.image})`}
          >
            <Box
              maxWidth='324px'
              width='100%'
              position='absolute'
              left='20px'
              bottom='52px'
              overflow='hidden'
            >
              <NextLink
                color={slide.color}
                fontSize='semiLarge'
                lineHeight='normal'
                fontWeight='small'
                href={slide.buttonLink}
              >
                {slide.title}
              </NextLink>
            </Box>
          </Background>
        ))}
      </Slideshow>
    </>
  )
}

export default MegaMenuSlideshow
