import styled    from '@emotion/styled'
import { FC }    from 'react'

import { Input } from './Input'

export const SearchInput: FC<any> = styled(Input)<any>(({ transparent }) => ({
  '::placeholder': {
    color: transparent ? 'white' : '',
  },
}))
