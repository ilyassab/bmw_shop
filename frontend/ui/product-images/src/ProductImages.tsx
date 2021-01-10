import React, { FC, useState } from 'react'
import { Box, Column }         from '@atlantis-lab/layout'

import { Background }          from '@ui/background'
import { Condition }           from '@ui/condition'
import { ImageStub }           from '@ui/image-stub'
import { Transition }          from '@ui/transition'

interface Props {
  images?: string[]
  opacity?: number
  hover?: boolean
}

const ProductImages: FC<Props> = ({ images, hover, opacity }) => {
  const [imageNumber, setImageNumber] = useState(0)

  const onMouseMove = event => {
    const targetParameters = event.target.getBoundingClientRect()
    const xCoordinate = event.clientX - targetParameters.left
    const targetWidth = targetParameters.width
    const oneImageWidth = targetWidth / images.length
    const newImageNumber = Math.ceil(xCoordinate / oneImageWidth)
    setImageNumber(newImageNumber - 1 > -1 ? newImageNumber - 1 : 0)
  }

  if (images.length === 0) {
    return (
      <Column width={['152px', '200px', '240px']} alignItems='center' position='relative'>
        <ImageStub width={['120px', '200px', '240px']} height={['120px', '240px', '240px']} />
      </Column>
    )
  }

  return (
    <Column width={['90%', '90%', '240px']} position='relative'>
      {images.map((item, index) => (
        <Background
          key={`${item}`}
          width='100%'
          height={['120px', '240px', '240px']}
          display={imageNumber === index ? 'flex' : 'none'}
          backgroundColor='white'
          backgroundPosition='center'
          position='relative'
          backgroundSize='contain'
          backgroundImage={`url(${item})`}
          onMouseMove={onMouseMove}
        />
      ))}
      <Condition match={images.length > 1}>
        <Transition transition='0.25s' opacity={opacity}>
          <Box
            flexDirection='row'
            width='100%'
            position='absolute'
            bottom={0}
            justifyContent='space-between'
          >
            {images.map((item, index) => (
              <Box
                key={item}
                height='2px'
                width={`calc(100% / ${images.length} - 5px)`}
                backgroundColor={index === imageNumber ? 'crumbsGray' : 'dividerGray'}
              />
            ))}
          </Box>
        </Transition>
      </Condition>
    </Column>
  )
}

export default ProductImages
