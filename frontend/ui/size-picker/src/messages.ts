import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  size: {
    id: `${scope}.size`,
    defaultMessage: 'Размер',
  },
  tableSize: {
    id: `${scope}.howTo`,
    defaultMessage: 'Таблица соответствия размеров.',
  },
  howTo: {
    id: `${scope}.howTo`,
    defaultMessage: 'Как узнать свой размер?',
  },
})
