import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  collection: {
    id: `${scope}.collection`,
    defaultMessage: 'Коллекция',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Поиск',
  },
})
