import React              from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Background }     from '@ui/background'
import { Text }           from '@ui/text'

export const Image = ({ data }) => (
  <Column>
    <Background
      width={['100%', '100%', '780px']}
      height={['184px', '356px', '380px']}
      backgroundColor='crumbsGray'
      backgroundPosition='center'
      backgroundSize='cover'
      backgroundImage={`url(${data.file && data.file.url})`}
    />
    <Layout flexBasis='16px' />
    <Text
      textAlign='center'
      fontSize='small'
      lineHeight='extra'
      color='dustyGray'
      dangerouslySetInnerHTML={{ __html: data.caption }}
    />
    <Layout flexBasis='24px' />
  </Column>
)
