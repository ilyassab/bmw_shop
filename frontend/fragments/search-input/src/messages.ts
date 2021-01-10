import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  find: {
    id: `${scope}.find`,
    defaultMessage: 'Найти',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Поиск...',
  },
})
