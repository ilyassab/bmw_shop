import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  sort: {
    id: `${scope}.sort`,
    defaultMessage: 'Сортировать',
  },
  sortBy: {
    id: `${scope}.sort-by`,
    defaultMessage: 'сортировать по',
  },
  down: {
    id: `${scope}.down`,
    defaultMessage: 'убыванию цены',
  },
  up: {
    id: `${scope}.up`,
    defaultMessage: 'возрастанию цены',
  },
  popular: {
    id: `${scope}.popular`,
    defaultMessage: 'популярности',
  },
})
