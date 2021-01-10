import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  registration: {
    id: `${scope}.registration`,
    defaultMessage: 'Регистрация.',
  },
  afterRegistration: {
    id: `${scope}.after_registration`,
    defaultMessage:
      'После регистрации вам станет доступен личный кабинет с историей заказов. Если у вас уже есть аккаунт  —  ',
  },
  enter: {
    id: `${scope}.enter`,
    defaultMessage: 'войдите.',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Пароль',
  },
  firstName: {
    id: `${scope}.first_name`,
    defaultMessage: 'Имя',
  },
  secondName: {
    id: `${scope}.second_name`,
    defaultMessage: 'Фамилия',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Зарегистрироваться',
  },
  iAgreeWith: {
    id: `${scope}.i_agree_with`,
    defaultMessage: 'Я соглашаюсь с',
  },
  termsOfUse: {
    id: `${scope}.terms_of_use`,
    defaultMessage: 'Условиями и способами обработки персональных данных',
  },
  bmwGroup: {
    id: `${scope}.bmw_group`,
    defaultMessage: 'BMW Group в России и официального магазина.',
  },
})
