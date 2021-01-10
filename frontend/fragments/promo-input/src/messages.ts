import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  promocode: {
    id: `${scope}.promocode`,
    defaultMessage: 'Промокод',
  },
  activated: {
    id: `${scope}.activated`,
    defaultMessage: 'Активирован',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Отменить',
  },
})
