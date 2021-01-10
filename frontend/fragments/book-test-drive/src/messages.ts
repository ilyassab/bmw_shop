import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  bookTestDrive: {
    id: `${scope}.book_test_drive`,
    defaultMessage: 'Забронировать тест-драйв',
  },
  typeYourName: {
    id: `${scope}.book_test_drive`,
    defaultMessage:
      'Укажите свое имя, номер и удобное время звонка, мы обязательно вам позвоним и обсудим дату.',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Имя',
  },
  telephone: {
    id: `${scope}.telephone`,
    defaultMessage: 'Телефон',
  },
  time: {
    id: `${scope}.time`,
    defaultMessage: 'Удобное время звонка',
  },
  left: {
    id: `${scope}.left`,
    defaultMessage: 'Оставить заявку',
  },
})
