import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  isInDC: {
    id: `${scope}.isInDC`,
    defaultMessage: 'Наличие в ДЦ',
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'Введите название населенного пункта...',
  },
  list: {
    id: `${scope}.list`,
    defaultMessage: 'Список',
  },
  map: {
    id: `${scope}.map`,
    defaultMessage: 'Карта',
  },
})
