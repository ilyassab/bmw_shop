import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  pickpoint: {
    id: `${scope}.pickpoint`,
    defaultMessage: 'Пункт выдачи',
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'Город',
  },
  yourCity: {
    id: `${scope}.yourCity`,
    defaultMessage: 'Ваш город:',
  },
})
