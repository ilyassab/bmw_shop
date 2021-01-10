import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  editCar: {
    id: `${scope}.editCar`,
    defaultMessage: 'Редактировать автомобиль',
  },
  text: {
    id: `${scope}.text`,
    defaultMessage:
      'Укажите контактные данные, по которым мы сможем связаться с вами для уточнения всех деталий записи.',
  },
  addCar: {
    id: `${scope}.addCar`,
    defaultMessage: 'Добавить автомобиль',
  },
  series: {
    id: `${scope}.series`,
    defaultMessage: 'Серия',
  },
  carcase: {
    id: `${scope}.carcase`,
    defaultMessage: 'Кузов',
  },
  model: {
    id: `${scope}.model`,
    defaultMessage: 'Модель',
  },
  vin: {
    id: `${scope}.vin`,
    defaultMessage: 'VIN',
  },
  dealers: {
    id: `${scope}.dealers`,
    defaultMessage: 'Дилерский центр',
  },
  mainCar: {
    id: `${scope}.mainCar`,
    defaultMessage: 'Сделать автомобиль основным.',
  },
})
