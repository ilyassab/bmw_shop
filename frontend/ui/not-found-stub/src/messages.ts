import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  unfortunately: {
    id: `${scope}.unfortunately`,
    defaultMessage:
      'К сожалению запрашиваемая вами страница не найдена. Воспользуйтесь поиском или перейдите на главную страницу.',
  },
  toMain: {
    id: `${scope}.to_main`,
    defaultMessage: 'Перейти на главную страницу',
  },
})
