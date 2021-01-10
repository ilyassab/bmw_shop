import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  showMore: {
    id: `${scope}.show_more`,
    defaultMessage: 'Показать больше товаров',
  },
  hits: {
    id: `${scope}.hits`,
    defaultMessage: 'Хиты продаж.',
  },
})
