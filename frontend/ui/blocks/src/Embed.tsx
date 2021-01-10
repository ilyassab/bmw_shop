import styled             from '@emotion/styled'
import React, { FC }      from 'react'
import { Column, Layout } from '@atlantis-lab/layout'
import { width }          from 'styled-system'

import { Text }           from '@ui/text'

const IframeUI: FC<any> = styled.iframe<any>(
  ({ height }) => ({
    border: 0,
    height,
  }),
  width
)

export const Embed = ({ data }) => (
  <Column>
    <Column alignItems='center'>
      <IframeUI
        width={['100%', '100%', data.width]}
        height={data.height}
        src={data.embed}
        allowFullScreen
      />
      <Layout flexBasis='26px' />
      <Text
        textAlign='center'
        fontSize='small'
        lineHeight='extra'
        color='dustyGray'
        dangerouslySetInnerHTML={{ __html: data.caption }}
      />
    </Column>
    <Layout flexBasis='24px' />
  </Column>
)
