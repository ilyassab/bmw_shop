import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  personalCabinet: {
    id: `${scope}.personal_cabinet`,
    defaultMessage: 'Личный кабинет',
  },
  exit: {
    id: `${scope}.exit`,
    defaultMessage: 'Выйти из аккаунта',
  },
})
