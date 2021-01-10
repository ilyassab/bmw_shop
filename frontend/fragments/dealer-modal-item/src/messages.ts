import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  isInDC: {
    id: `${scope}.isInDC`,
    defaultMessage: 'Наличие в ДЦ',
  },
  count: {
    id: `${scope}.count`,
    defaultMessage: 'шт.',
  },
  workTime: {
    id: `${scope}.workTime`,
    defaultMessage: 'Время работы:',
  },
  tel: {
    id: `${scope}.tel`,
    defaultMessage: 'Тел.:',
  },
})
