import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  news: {
    id: `${scope}.news`,
    defaultMessage: 'Новости',
  },
  latestNews: {
    id: `${scope}.latestNews`,
    defaultMessage: 'Последние новости',
  },
})
