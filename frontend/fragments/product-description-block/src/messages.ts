import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Описание',
  },
  delivery: {
    id: `${scope}.delivery`,
    defaultMessage: 'Доставка',
  },
  characteristics: {
    id: `${scope}.characteristics`,
    defaultMessage: 'Характеристики',
  },
})
