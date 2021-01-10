import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  recovery: {
    id: `${scope}.recovery`,
    defaultMessage: 'Восстановление доступа.',
  },
  typeEmail: {
    id: `${scope}.enter_through`,
    defaultMessage:
      'Введите email-адрес, на который зарегистрирован ваш аккаунт и мы пришлем ссылку для создания нового пароля.',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  recover: {
    id: `${scope}.recover`,
    defaultMessage: 'Восстановить пароль',
  },
  verify: {
    id: `${scope}.verify`,
    defaultMessage: 'Проверьте почту.',
  },
  weSend: {
    id: `${scope}.weSend`,
    defaultMessage:
      'Мы выслали вам инструкции по восстановлению доступа к аккаунту на указанный адрес почты.',
  },
  goTo: {
    id: `${scope}.goTo`,
    defaultMessage: 'Перейти в почту',
  },
})
