import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  oneItem: {
    id: `${scope}.one_item`,
    defaultMessage: 'товар',
  },
  twoItem: {
    id: `${scope}.two_item`,
    defaultMessage: 'товара',
  },
  fiveItem: {
    id: `${scope}.five_item`,
    defaultMessage: 'товаров',
  },
  showMore: {
    id: `${scope}.show_more`,
    defaultMessage: 'Показать еще',
  },
})
