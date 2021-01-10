import React, { FC, Fragment, useState } from 'react'
import { Box, Layout }                   from '@atlantis-lab/layout'

import { Background }                    from '@ui/background'
import { Condition }                     from '@ui/condition'
import { SearchIcon }                    from '@ui/icons'
import { ImageStub }                     from '@ui/image-stub'
import { NoScrollbar }                   from '@ui/no-scrollbar'
import { Transition }                    from '@ui/transition'
import { ZoomModal }                     from '@ui/zoom-modal'

interface Props {
  images?: string[]
  zoomOpened?: boolean
  setZoomOpened?: (arg0?: boolean) => void
  setCanClose?: (arg0?: boolean) => void
  modal?: boolean
}

export const ImagePicker: FC<Props> = ({
  images,
  zoomOpened,
  setCanClose,
  setZoomOpened,
  modal,
}) => {
  const [currentImage, setCurrentImage] = useState(images && images[0])
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hover, setHover] = useState(false)

  if (images.length === 0) {
    return (
      <Box
        width={['100%', 'initial', '100%']}
        flexDirection={['column', 'column', 'row']}
        alignItems={['center', 'initial', 'initial']}
      >
        <ImageStub
          width={modal ? '384px' : ['288px', '336px', '486px']}
          height={modal ? '384px' : ['288px', '336px', '486px']}
        />
      </Box>
    )
  }

  return (
    <Box width={['initial', 'initial', '100%']} flexDirection={['column', 'column', 'row']}>
      <Background
        flexShrink={0}
        width={modal ? '384px' : ['100%', '336px', '486px']}
        height={modal ? '384px' : ['288px', '336px', '486px']}
        alignItems='center'
        justifyContent='center'
        backgroundImage={`url(${currentImage})`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          if (setCanClose) {
            setCanClose(false)
          }
          setZoomOpened(true)
        }}
        cursor='pointer'
        backgroundSize='cover'
        border='solidGray'
      >
        <Transition
          backgroundColor='transparentBlack'
          opacity={hover ? 1 : 0}
          width='55px'
          height='55px'
          alignItems='center'
          justifyContent='center'
          borderRadius='huge'
        >
          <SearchIcon width='20px' height='20px' color='white' />
        </Transition>
      </Background>
      <Layout flexBasis={['16px', '16px', '24px']} />
      <NoScrollbar
        flexDirection={['row', 'row', 'column']}
        width='auto'
        maxHeight={modal ? '384px' : '486px'}
        maxWidth={['100%', '336px', 'auto']}
        overflowX={['scroll', 'scroll', 'hidden']}
      >
        {images.map((item, index) => (
          <Fragment key={item}>
            <Background
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setCurrentImage(item)}
              cursor='pointer'
              width={['60px', '60px', '78px']}
              height={['60px', '60px', '78px']}
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
      <ZoomModal
        onClose={() => {
          if (setCanClose) {
            setCanClose(true)
          }
          setZoomOpened(false)
        }}
        images={images}
        image={currentImage}
        opened={zoomOpened}
      />
    </Box>
  )
}
