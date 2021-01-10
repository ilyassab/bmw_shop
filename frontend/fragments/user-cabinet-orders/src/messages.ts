import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  history: {
    id: `${scope}.history`,
    defaultMessage: 'История заказов.',
  },
  orderNumber: {
    id: `${scope}.orderNumber`,
    defaultMessage: 'Заказ №',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Сумма',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Статус',
  },
  noOrders: {
    id: `${scope}.noOrders`,
    defaultMessage: 'Заказов не найдено.',
  },
  from: {
    id: `${scope}.from`,
    defaultMessage: 'от',
  },
  more: {
    id: `${scope}.more`,
    defaultMessage: 'Подробнее',
  },
})
