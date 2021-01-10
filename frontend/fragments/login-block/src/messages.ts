import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  hello: {
    id: `${scope}.hello`,
    defaultMessage: 'Здравствуйте.',
  },
  enterThrough: {
    id: `${scope}.enter_through`,
    defaultMessage: 'Войдите через электронную почту.',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Пароль',
  },
  accounts: {
    id: `${scope}.accounts`,
    defaultMessage: 'Нет аккаунта?',
  },
  registration: {
    id: `${scope}.registration`,
    defaultMessage: 'Зарегистрироваться',
  },
  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: 'Забыли пароль?',
  },
  enter: {
    id: `${scope}.enter`,
    defaultMessage: 'Войти',
  },
})
