import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  hotLine: {
    id: `${scope}.hot_line`,
    defaultMessage: 'Телефон горячей линии',
  },
  news: {
    id: `${scope}.news`,
    defaultMessage: 'Подпишитесь на новостную рассылку',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Ваш e-mail адрес',
  },
  copyright: {
    id: `${scope}.copyright`,
    defaultMessage: 'Copyright',
  },
  policy: {
    id: `${scope}.policy`,
    defaultMessage: 'Политика конфиденциальности',
  },
  bmwIcon: {
    id: `${scope}.bmw_icon`,
    defaultMessage: '© BMW AG 2020',
  },
  design: {
    id: `${scope}.design`,
    defaultMessage: 'Дизайн',
  },
  hmns: {
    id: `${scope}.hmns`,
    defaultMessage: 'HMNS',
  },
})
