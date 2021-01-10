import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  showMore: {
    id: `${scope}.show_more`,
    defaultMessage: 'Показать еще',
  },
  oneNews: {
    id: `${scope}.one_news`,
    defaultMessage: 'новость',
  },
  twoNews: {
    id: `${scope}.two_news`,
    defaultMessage: 'новости',
  },
  fiveNews: {
    id: `${scope}.five_news`,
    defaultMessage: 'новостей',
  },
})
