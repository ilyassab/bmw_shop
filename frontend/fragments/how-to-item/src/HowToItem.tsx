import React, { FC, useState } from 'react'
import { Column, Layout }      from '@atlantis-lab/layout'

import { ExternalIcon }        from '@ui/icons'
import { NextLink }            from '@ui/link'
import { Space, Text }         from '@ui/text'
import { Transition }          from '@ui/transition'

interface Props {
  link?: string
  text?: string
  title?: string
  url?: string
}

const HowToItem: FC<Props> = ({ link, text, title, url }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Transition
      width='100%'
      backgroundColor='white'
      overflow='hidden'
      height={['260px', '180px', '384px']}
      maxWidth={['auto', 'auto', '384px']}
      justifyContent='center'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      boxShadow={hovered ? 'howToHovered' : 'howToDefault'}
    >
      <Column maxWidth={['240px', '640px', '304px']}>
        <Layout flexBasis={['24px', '24px', '40px']} />
        <Text
          color='semiBlack'
          fontWeigth='small'
          fontSize={['xmedium', 'xmedium', 'semiLarge']}
          lineHeight='normal'
        >
          {title}
        </Text>
        <Layout flexBasis={['12px', '12px', '16px']} />
        <Text
          color='dustyGray'
          fontWeigth='small'
          fontSize={['semiMedium', 'semiMedium', 'medium']}
          lineHeight='extra'
        >
          {text}
        </Text>
        <Layout flexGrow={1} />
        <Layout>
          <NextLink
            href={url}
            color='blue'
            fontWeight='semiBold'
            lineHeight='small'
            fontSize={['semiMedium', 'semiMedium', 'medium']}
            underline
          >
            {link}
          </NextLink>
          <NextLink href={url}>
            <Space count={2} />
            <ExternalIcon />
          </NextLink>
        </Layout>
        <Layout flexBasis={['24px', '24px', '40px']} />
      </Column>
    </Transition>
  )
}

export default HowToItem
