import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  oneItem: {
    id: `${scope}.one_item`,
    defaultMessage: 'товар',
  },
  twoItem: {
    id: `${scope}.two_items`,
    defaultMessage: 'товара',
  },
  fiveItem: {
    id: `${scope}.five_items`,
    defaultMessage: 'товаров',
  },
  sortBy: {
    id: `${scope}.sort_by`,
    defaultMessage: 'сортировать по ',
  },
  noOrders: {
    id: `${scope}.no_orders`,
    defaultMessage: 'Товаров не найдено.',
  },
})
