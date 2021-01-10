import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  forward: {
    id: `${scope}.forward`,
    defaultMessage: 'Вперёд',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Назад',
  },
})
