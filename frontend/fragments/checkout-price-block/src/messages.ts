import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  promoCode: {
    id: `${scope}.promoCode`,
    defaultMessage: 'Промокод',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Итого',
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: 'Всего к оплате',
  },
  delivery: {
    id: `${scope}.delivery`,
    defaultMessage: 'Доставка',
  },
  allOrder: {
    id: `${scope}.allOrder`,
    defaultMessage: 'Сумма заказа',
  },
  use: {
    id: `${scope}.use`,
    defaultMessage: 'Применить',
  },
  order: {
    id: `${scope}.order`,
    defaultMessage: 'Оформить заказ',
  },
  discount: {
    id: `${scope}.discount`,
    defaultMessage: 'Скидка по промокоду',
  },
})
