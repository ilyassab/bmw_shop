import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  myCar: {
    id: `${scope}.myCar`,
    defaultMessage: 'мои автомобили.',
  },
  text: {
    id: `${scope}.text`,
    defaultMessage:
      'Расскажите нам о своем автомобиле, чтобы мы могли присылать Вам персональные предложения и уведомлять Вас о специальных акциях для Вашего автомобиля.',
  },
  addCar: {
    id: `${scope}.addCar`,
    defaultMessage: 'Добавить автомобиль',
  },
  mainCar: {
    id: `${scope}.mainCar`,
    defaultMessage: '(основной автомобиль)',
  },
})
