import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  addToCart: {
    id: `${scope}.hit`,
    defaultMessage: 'Добавить в корзину',
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
  outOfDc: {
    id: `${scope}.out_of`,
    defaultMessage: 'Нет в наличии в ДЦ',
  },
  yourEmail: {
    id: `${scope}.email`,
    defaultMessage: 'Ваш e-mail',
  },
  weNotifyYou: {
    id: `${scope}.we_notify_you`,
    defaultMessage: 'Мы сообщим вам о поступлении.',
  },
  notify: {
    id: `${scope}.notify`,
    defaultMessage: 'Уведомить',
  },
})
