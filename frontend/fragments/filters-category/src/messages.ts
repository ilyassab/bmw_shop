import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  categories: {
    id: `${scope}.categories`,
    defaultMessage: 'Категории',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Поиск',
  },
  all: {
    id: `${scope}.search`,
    defaultMessage: 'Все',
  },
})
