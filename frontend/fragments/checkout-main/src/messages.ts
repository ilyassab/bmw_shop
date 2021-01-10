import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  iAgreeWith: {
    id: `${scope}.iAgreeWith`,
    defaultMessage: 'Я соглашаюсь с',
  },
  termsOfUse: {
    id: `${scope}.termsOfUse`,
    defaultMessage: 'Условиями и способами обработки персональных данных BMW Group в России',
  },
  and: {
    id: `${scope}.and`,
    defaultMessage: 'и',
  },
  officialShop: {
    id: `${scope}.officialShop`,
    defaultMessage: 'официального магазина',
  },
  iGive: {
    id: `${scope}.iGive`,
    defaultMessage:
      'Я даю согласие на получение информации* от BMW Group в России и официального магазина.',
  },
  including: {
    id: `${scope}.including`,
    defaultMessage:
      '*в том числе рекламной информации товаров и услуг BMW Group в России по сетям электросвязи (в частности, но не ограничиваясь: телефонной, смс, по адресу электронной почты) в соответствии с п. 1 ст. 18 Федерального закона от 13.03.2006 N 38-ФЗ "О рекламе"',
  },
  goTo: {
    id: `${scope}.goTo`,
    defaultMessage: 'Перейти к оплате заказа',
  },
})
