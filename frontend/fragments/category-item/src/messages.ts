import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  oneItem: {
    id: `${scope}.one_item`,
    defaultMessage: 'товар',
  },
  twoItems: {
    id: `${scope}.two_items`,
    defaultMessage: 'товара',
  },
  fiveItems: {
    id: `${scope}.five_items`,
    defaultMessage: 'товаров',
  },
})
