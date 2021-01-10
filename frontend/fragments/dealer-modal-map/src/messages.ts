import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  all: {
    id: `${scope}.all`,
    defaultMessage: 'Наличие:',
  },
  count: {
    id: `${scope}.count`,
    defaultMessage: 'шт.',
  },
  hide: {
    id: `${scope}.hide`,
    defaultMessage: 'Скрыть',
  },
})
