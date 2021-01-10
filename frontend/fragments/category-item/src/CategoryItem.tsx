import React, { FC, useState }               from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Background }                        from '@ui/background'
import { Condition }                         from '@ui/condition'
import { ImageStub }                         from '@ui/image-stub'
import { NextLink }                          from '@ui/link'
import { Space, Text }                       from '@ui/text'
import { Transition }                        from '@ui/transition'
import { declOfNum }                         from '@utils/decl-of-num'

import messages                              from './messages'

interface Props {
  item?: {
    id?: number
    slug?: string
    image?: string
    countElements?: number
    name?: string
  }
  category?: string
}

const CategoryItem: FC<WrappedComponentProps & Props> = ({ item, category, intl }) => {
  const [hovered, setHovered] = useState(false)
  if (!item) {
    return null
  }

  return (
    <Transition
      width={['100%', '50%', '400px']}
      height='430px'
      boxSizing='border-box'
      backgroundColor='white'
      outline='1px solid rgba(233, 233, 233, 1)'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      boxShadow={hovered ? 'categoryHovered' : 'none'}
      zIndex={hovered ? 1 : 0}
    >
      <NextLink
        href={`/catalog/${category}/[slug]`}
        as={`/catalog/${category}/${item.slug}`}
        width='100%'
      >
        <Box width='100%' justifyContent='center'>
          <Box maxWidth={['224px', '330px', '280px']} width='100%' overflow='hidden'>
            <Column alignItems='center'>
              <Layout flexBasis={['16px', '40px', '40px']} />
              <Condition match={item.image}>
                <Background
                  width={['288px', '240px', '240px']}
                  height={['288px', '240px', '240px']}
                  backgroundColor='white'
                  position='relative'
                  backgroundSize='contain'
                  backgroundImage={`url(${item.image})`}
                />
              </Condition>
              <Condition match={!item.image}>
                <ImageStub
                  width={['288px', '240px', '240px']}
                  height={['288px', '240px', '240px']}
                />
              </Condition>
              <Layout flexBasis='15px' />
              <Text
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                color={hovered ? 'blue' : 'semiBlack'}
                fontSize='default'
                lineHeight='regular'
                fontWeight='small'
              >
                {item.name}
              </Text>
              <Layout flexBasis='10px' />
              <Text
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                color='dustyGray'
                fontSize='semiMedium'
                lineHeight='regular'
                fontWeight='small'
              >
                {item.countElements}
                <Space />
                {declOfNum(item.countElements, [
                  intl.formatMessage(messages.oneItem),
                  intl.formatMessage(messages.twoItems),
                  intl.formatMessage(messages.fiveItems),
                ])}
              </Text>
            </Column>
          </Box>
        </Box>
      </NextLink>
    </Transition>
  )
}

export default injectIntl(CategoryItem)
