import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Настройка уведомлений.',
  },
  text: {
    id: `${scope}.text`,
    defaultMessage: 'Текст про настройку уведомлений на почту.',
  },
  currentPassword: {
    id: `${scope}.currentPassword`,
    defaultMessage: 'Текущий пароль',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Новый пароль',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Сохранить изменения',
  },
})
