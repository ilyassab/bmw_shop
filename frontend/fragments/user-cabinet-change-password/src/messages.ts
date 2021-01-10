import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Изменить пароль.',
  },
  inAnyMoment: {
    id: `${scope}.inAnyMoment`,
    defaultMessage:
      'Вы в любой момент можете изменить ваш пароль, чтобы обеспечить безопасность вашей учетной записи',
  },
  currentPassword: {
    id: `${scope}.currentPassword`,
    defaultMessage: 'Текущий пароль',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Новый пароль',
  },
  change: {
    id: `${scope}.change`,
    defaultMessage: 'Изменить пароль',
  },
})
