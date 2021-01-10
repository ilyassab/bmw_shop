import React         from 'react'
import { Column }    from '@atlantis-lab/layout'

import { Embed }     from './Embed'
import { Header }    from './Header'
import { Image }     from './Image'
import { List }      from './List'
import { Paragraph } from './Paragraph'
import { Quote }     from './Quote'
import { render }    from './render'

const renderers = {
  paragraph: Paragraph,
  image: Image,
  header: Header,
  list: List,
  quote: Quote,
  embed: Embed,
}

export const Blocks = ({ blocks = [] }) => <Column>{render(blocks, renderers)}</Column>
