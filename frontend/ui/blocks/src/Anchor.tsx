import React              from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Link }           from '@ui/link'

export const Anchor = ({ data }) => (
  <Column>
    <Link
      fontSize='semiMedium'
      color='blue'
      hoverColor='semiBlack'
      lineHeight='extra'
      dangerouslySetInnerHTML={{ __html: data.title }}
      href={`#${data.anchor}`}
    />
    <Layout flexBasis='16px' />
  </Column>
)
