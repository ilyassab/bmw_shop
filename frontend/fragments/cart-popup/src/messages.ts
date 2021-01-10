import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  allOrder: {
    id: `${scope}.allOrder`,
    defaultMessage: 'Сумма заказа',
  },
  order: {
    id: `${scope}.order`,
    defaultMessage: 'Оформить заказ',
  },
  empty: {
    id: `${scope}.empty`,
    defaultMessage: 'Ваша корзина пуста :(',
  },
})
