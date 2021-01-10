import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  series: {
    id: `${scope}.series`,
    defaultMessage: 'Серия',
  },
  carcase: {
    id: `${scope}.carcase`,
    defaultMessage: 'Кузов',
  },
  model: {
    id: `${scope}.model`,
    defaultMessage: 'Модель',
  },
  findAccessories: {
    id: `${scope}.model`,
    defaultMessage: 'найдите аксессуары для своего BMW',
  },
})
