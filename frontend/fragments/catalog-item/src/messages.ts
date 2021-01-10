import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  hit: {
    id: `${scope}.hit`,
    defaultMessage: 'Хит продаж',
  },
  new: {
    id: `${scope}.new`,
    defaultMessage: 'Новинка',
  },
  discount: {
    id: `${scope}.discount`,
    defaultMessage: 'Скидка',
  },
  addToCart: {
    id: `${scope}.hit`,
    defaultMessage: 'Добавить в корзину',
  },
  watch: {
    id: `${scope}.watch`,
    defaultMessage: 'Смотреть',
  },
  outOfOrder: {
    id: `${scope}.out_of_order`,
    defaultMessage: 'Нет в наличии',
  },
})
