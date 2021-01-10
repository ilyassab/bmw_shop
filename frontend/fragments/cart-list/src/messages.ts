import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  yourCart: {
    id: `${scope}.yourCart`,
    defaultMessage: 'Ваша корзина',
  },
  item: {
    id: `${scope}.item`,
    defaultMessage: 'Товар',
  },
  amount: {
    id: `${scope}.amount`,
    defaultMessage: 'Количество',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Цена',
  },
  empty: {
    id: `${scope}.empty`,
    defaultMessage: 'Ваша корзина пуста',
  },
  goToCatalog: {
    id: `${scope}.goToCatalog`,
    defaultMessage: 'Перейти в каталог',
  },
})
