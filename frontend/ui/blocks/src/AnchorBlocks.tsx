import React      from 'react'
import { Column } from '@atlantis-lab/layout'

import { Anchor } from './Anchor'
import { render } from './render'

const renderers = {
  anchor: Anchor,
}

export const AnchorBlocks = ({ blocks = [] }) => <Column>{render(blocks, renderers)}</Column>
