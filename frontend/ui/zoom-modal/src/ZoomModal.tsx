import styled                                       from '@emotion/styled'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { Box, Layout }                              from '@atlantis-lab/layout'
import { layout }                                   from 'styled-system'

import { Modal }                                    from '@atlantis-lab/modal'
import { Background }                               from '@ui/background'
import { Condition }                                from '@ui/condition'
import { Cross }                                    from '@ui/cross'
import { CloseIcon }                                from '@ui/icons'
import { NoScrollbar }                              from '@ui/no-scrollbar'

interface Props {
  images?: string[]
  image?: string
  opened?: boolean
  onClose?: () => void
}

const StyledIMG = styled.img<any>(
  {
    margin: '0 auto',
  },
  layout
)

const ZoomModal: FC<Props> = ({ onClose, opened, image, images }) => {
  const [currentImage, setCurrentImage] = useState(images && images[0])
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)

  useEffect(() => {
    if (image) {
      setCurrentImage(image)
    }
  }, [image])

  useEffect(() => {
    if (currentImage) {
      const newImg = new Image()
      newImg.src = currentImage
      newImg.onload = () => {
        setHeight(newImg.height)
        setWidth(newImg.width)
      }
    }
  }, [currentImage])

  return (
    <Modal visible={opened} onClose={onClose} alignItems={['flex-start', 'flex-start', 'center']}>
      <Box
        position='relative'
        width='100%'
        minHeight={['100.5%', '100.5%', '100%']}
        backgroundColor='white'
      >
        <Box
          alignItems='center'
          justifyContent='center'
          display={['flex', 'flex', 'none']}
          backgroundColor='transparentBlack'
          zIndex={5}
          position='fixed'
          width={['48px', '72px', 'auto']}
          height={['48px', '72px', 'auto']}
          top={[0, 0, 32]}
          right={[0, 0, 32]}
          onClick={onClose}
        >
          <Box display={['none', 'flex', 'none']}>
            <CloseIcon width='24px' height='24px' color='white' />
          </Box>
          <Box display={['flex', 'none', 'none']}>
            <CloseIcon width='16px' height='16px' color='white' />
          </Box>
        </Box>
        <Box
          zIndex={5}
          display={['none', 'none', 'flex']}
          position='absolute'
          top={32}
          right={32}
          onClick={onClose}
        >
          <Cross />
        </Box>
        <Box justifyContent='center' width='100%'>
          <NoScrollbar
            flexDirection={['row', 'row', 'column']}
            display={['none', 'none', 'flex']}
            mt='32px'
            mb='32px'
            width='auto'
            maxHeight='100%'
            maxWidth={['100%', '336px', 'auto']}
            overflowX={['scroll', 'scroll', 'hidden']}
          >
            {images.map((item, index) => (
              <Fragment key={item}>
                <Background
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => setCurrentImage(item)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  width={['60px', '60px', '78px']}
                  height={['60px', '60px', '78px']}
                  cursor='pointer'
                  flexShrink={0}
                  backgroundImage={`url(${item})`}
                  border={
                    /* eslint-disable no-nested-ternary */
                    currentImage === item
                      ? 'solidBlack'
                      : hoveredIndex === index
                      ? 'hoveredGray'
                      : 'solidGray'
                  }
                />
                <Condition match={index !== images.length - 1}>
                  <Layout flexShrink={0} flexBasis='12px' />
                </Condition>
              </Fragment>
            ))}
          </NoScrollbar>
          <Layout display={['none', 'none', 'flex']} flexBasis={['16px', '16px', '24px']} />
          <Box width='100%' alignItems='center' display={['flex', 'flex', 'none']} overflow='auto'>
            <StyledIMG src={currentImage} width={width} height={height} />
          </Box>
          <Box
            width='76%'
            height='100vh'
            display={['none', 'none', 'flex']}
            overflow='auto'
            justifyContent='center'
            alignItems='center'
          >
            <Background
              flexShrink={0}
              width={width}
              height={height}
              backgroundImage={`url(${currentImage})`}
              backgroundSize='cover'
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ZoomModal
