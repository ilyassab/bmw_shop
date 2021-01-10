import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Товар успешно добавлен',
  },
  tabletSuccess: {
    id: `${scope}.success`,
    defaultMessage: 'Товар добавлен',
  },
  saved: {
    id: `${scope}.saved`,
    defaultMessage: 'Сохранено',
  },
})
