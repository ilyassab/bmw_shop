import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  orderNumber: {
    id: `${scope}.orderNumber`,
    defaultMessage: 'Заказ №',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Дата',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Сумма',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Статус',
  },
  art: {
    id: `${scope}.art`,
    defaultMessage: 'Арт',
  },
  backToHistory: {
    id: `${scope}.backToHistory`,
    defaultMessage: 'Назад в историю',
  },
})
