import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Фильтр',
  },
  clearAll: {
    id: `${scope}.clear-all`,
    defaultMessage: 'Очистить все',
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
  categories: {
    id: `${scope}.categories`,
    defaultMessage: 'Категории',
  },
})
