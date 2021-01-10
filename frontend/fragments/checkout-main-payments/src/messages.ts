import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  cardOnline: {
    id: `${scope}.cardOnline`,
    defaultMessage: 'Картой онлайн',
  },
  cardOffline: {
    id: `${scope}.cardOffline`,
    defaultMessage: 'Картой при получении',
  },
  cash: {
    id: `${scope}.cash`,
    defaultMessage: 'Наличными при получении',
  },
  cashTablet: {
    id: `${scope}.cashTablet`,
    defaultMessage: 'Наличными',
  },
  typeOfPayment: {
    id: `${scope}.typeOfPayment`,
    defaultMessage: 'Тип оплаты',
  },
})
