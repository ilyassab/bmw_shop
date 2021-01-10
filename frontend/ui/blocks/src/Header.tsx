import React              from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Condition }      from '@ui/condition'
import { Text }           from '@ui/text'

export const Header = ({ data }) => (
  <Column>
    <Condition match={data.level === '_1'}>
      <Text
        fontSize={['large', 'xlarge', 'huge']}
        lineHeight='regular'
        fontWeight='semiBold'
        overflow='hidden'
        textOverflow='ellipsis'
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    </Condition>
    <Condition match={data.level === '_2'}>
      <Text
        fontSize={['preLarge', 'large', 'xlarge']}
        lineHeight='regular'
        fontWeight='semiBold'
        overflow='hidden'
        textOverflow='ellipsis'
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    </Condition>
    <Condition match={data.level === '_3'}>
      <Text
        fontSize={['semiLarge', 'preLarge', 'large']}
        lineHeight='regular'
        fontWeight='semiBold'
        overflow='hidden'
        textOverflow='ellipsis'
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    </Condition>
    <Condition match={data.level === '_4'}>
      <Text
        fontSize={['xlmedium', 'semiLarge', 'preLarge']}
        lineHeight='regular'
        fontWeight='semiBold'
        overflow='hidden'
        textOverflow='ellipsis'
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    </Condition>
    <Condition match={data.level === '_5'}>
      <Text
        fontSize={['medium', 'default', 'xmedium']}
        lineHeight='regular'
        fontWeight='semiBold'
        overflow='hidden'
        textOverflow='ellipsis'
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    </Condition>
    <Layout flexBasis='24px' />
  </Column>
)
