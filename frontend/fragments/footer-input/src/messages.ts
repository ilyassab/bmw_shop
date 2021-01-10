import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  incorrect: {
    id: `${scope}.incorrect`,
    defaultMessage: 'Поле заполненно некорректно',
  },
  required: {
    id: `${scope}.required`,
    defaultMessage: 'Это обязательное поле',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Ваш e-mail адрес',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Подписка оформлена!',
  },
})
