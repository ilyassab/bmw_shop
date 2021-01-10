import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  personalInformation: {
    id: `${scope}.personalInformation`,
    defaultMessage: 'Личная информация',
  },
  data: {
    id: `${scope}.data`,
    defaultMessage: 'Данные',
  },
  changePass: {
    id: `${scope}.changePass`,
    defaultMessage: 'Изменить пароль',
  },
  Pass: {
    id: `${scope}.Pass`,
    defaultMessage: 'Пароль',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Настройка уведомлений',
  },
  notify: {
    id: `${scope}.notify`,
    defaultMessage: 'Уведомления',
  },
  history: {
    id: `${scope}.history`,
    defaultMessage: 'История заказов',
  },
  cars: {
    id: `${scope}.cars`,
    defaultMessage: 'Мои автомобили',
  },
})
