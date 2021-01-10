import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  art: {
    id: `${scope}.art`,
    defaultMessage: 'Арт.',
  },
  goTo: {
    id: `${scope}.go_to`,
    defaultMessage: 'Перейти на страницу товара',
  },
  model: {
    id: `${scope}.model`,
    defaultMessage: 'Марка и модель шины',
  },
})
