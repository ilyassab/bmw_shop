import React, { FC, useState }               from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Background }                        from '@ui/background'
import { Condition }                         from '@ui/condition'
import { Gradient }                          from '@ui/gradient'
import { ArrowRightIcon }                    from '@ui/icons'
import { NextLink }                          from '@ui/link'
import { Space, Text }                       from '@ui/text'

interface Props {
  item?: {
    color?: string
    image?: string
    title?: string
    intro?: string
    buttonLink?: string
    buttonText?: string
    gradient?: string
  }
}

const PromoItem: FC<Props & WrappedComponentProps> = ({ item }) => {
  if (!item) {
    return null
  }
  const [hover, setHover] = useState(false)

  return (
    <NextLink href={item.buttonLink} width='100%'>
      <Box
        width='100%'
        position='relative'
        overflow='hidden'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Background
          width='100%'
          height={['290px', '360px', '440px']}
          backgroundColor='dustyGray'
          backgroundPosition='center'
          backgroundSize='cover'
          backgroundImage={`url(${item.image})`}
          scaleOnHover
          hover={hover}
        >
          <Gradient type={item.gradient} />
        </Background>
        <Box
          width='100%'
          maxWidth={['256px', '490px', '490px']}
          position='absolute'
          bottom={['32px', '32px', '60px']}
          left={['5%', '5%', '60px']}
          overflow='hidden'
        >
          <Column>
            <Text color={item.color} fontSize={['semiLarge', 'large', 'large']} fontWeight='tiny'>
              {item.title}
            </Text>
            <Condition match={item.intro}>
              <Layout display={['none', 'flex', 'none']}>
                <Layout flexBasis='20px' />
                <Text color='dustyGray' fontSize='medium' lineHeight='extra'>
                  {item.intro}
                </Text>
              </Layout>
            </Condition>
            <Layout flexBasis='20px' />
            <Box width='100%'>
              <Text
                href={item.buttonLink}
                color={item.color}
                fontSize='semiMedium'
                fontWeight='semiBold'
              >
                {item.buttonText}
              </Text>
              <Space count={3} />
              <Box alignItems='center'>
                <ArrowRightIcon width='8px' height='13px' color={item.color} />
              </Box>
            </Box>
            <Layout flexBasis='5px' />
          </Column>
        </Box>
      </Box>
    </NextLink>
  )
}

export default injectIntl(PromoItem)
