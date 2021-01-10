import React                   from 'react'
import { Box, Column, Layout } from '@atlantis-lab/layout'

import { Text }                from '@ui/text'

export const Quote = ({ data }) => (
  <Column>
    <Box pl='24px' borderLeft='blue'>
      <Text
        fontSize='xlmedium'
        lineHeight='extra'
        dangerouslySetInnerHTML={{ __html: data.title }}
      />
    </Box>
    <Layout flexBasis='24px' />
  </Column>
)
