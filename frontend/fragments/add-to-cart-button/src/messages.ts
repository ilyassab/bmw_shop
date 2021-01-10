import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  addToCart: {
    id: `${scope}.hit`,
    defaultMessage: 'Добавить в корзину',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Добавить',
  },
  inOrder: {
    id: `${scope}.in_order`,
    defaultMessage: 'В наличии в',
  },
  in: {
    id: `${scope}.in`,
    defaultMessage: 'ДЦ',
  },
  outOf: {
    id: `${scope}.out_of`,
    defaultMessage: 'Нет в наличии. Уведомить о поступлении?',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Ваш e-mail адрес',
  },
  notify: {
    id: `${scope}.notify`,
    defaultMessage: 'Уведомить',
  },
  outOfOrder: {
    id: `${scope}.outOfOrder`,
    defaultMessage: 'Нет в наличии',
  },
})
