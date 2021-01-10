import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  contacts: {
    id: `${scope}.contacts`,
    defaultMessage: 'Контактные данные.',
  },
  typeYourData: {
    id: `${scope}.typeYourData`,
    defaultMessage:
      'Укажите ваши контактные данные чтобы мы смогли связаться с вами для подтверждения заказа. Уже зарегистрированы?',
  },
  enter: {
    id: `${scope}.enter`,
    defaultMessage: 'Войти',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'Имя',
  },
  secondName: {
    id: `${scope}.secondName`,
    defaultMessage: 'Фамилия',
  },
  telephone: {
    id: `${scope}.telephone`,
    defaultMessage: 'Телефон',
  },
  man: {
    id: `${scope}.man`,
    defaultMessage: 'Господин',
  },
  woman: {
    id: `${scope}.woman`,
    defaultMessage: 'Госпожа',
  },
})
