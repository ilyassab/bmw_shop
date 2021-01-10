import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  sort: {
    id: `${scope}.sort`,
    defaultMessage: 'Сортировка',
  },
  popular: {
    id: `${scope}.popular`,
    defaultMessage: 'По популярности',
  },
  upPrice: {
    id: `${scope}.up-price`,
    defaultMessage: 'По возрастанию цены',
  },
  downPrice: {
    id: `${scope}.down-price`,
    defaultMessage: 'По убыванию цены',
  },
})
