import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  subscribeDone: {
    id: `${scope}.subscribe_done`,
    defaultMessage: 'Подписка успешно оформлена!',
  },
  typeMore: {
    id: `${scope}.type_more`,
    defaultMessage:
      'Укажите дополнительные данные о себе, чтобы получать персональные предложения.',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Отправить',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Имя',
  },
  familyName: {
    id: `${scope}.familyName`,
    defaultMessage: 'Фамилия',
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'Мобильный телефон',
  },
  thanks: {
    id: `${scope}.thanks`,
    defaultMessage: 'Спасибо!',
  },
  yourData: {
    id: `${scope}.your_data`,
    defaultMessage:
      'Ваши данные были успешно отправлены! Теперь вы сможете получать индивидуальные предложения от BMW.',
  },
  continue: {
    id: `${scope}.continue`,
    defaultMessage: 'Продолжить',
  },
})
