import React              from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Text }           from '@ui/text'

export const Paragraph = ({ data }) => (
  <Column>
    <Text
      fontSize={['semiMedium', 'medium', 'default']}
      lineHeight='extra'
      fontWeight='small'
      dangerouslySetInnerHTML={{ __html: data.text }}
      overflow='hidden'
      textOverflow='ellipsis'
    />
    <Layout flexBasis='24px' />
  </Column>
)
