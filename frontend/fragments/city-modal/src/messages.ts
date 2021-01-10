import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  chooseCity: {
    id: `${scope}.choose_city`,
    defaultMessage: 'Выберите город',
  },
  typeCityName: {
    id: `${scope}.type_city_name`,
    defaultMessage: 'Введите название населенного пункта...',
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'Город',
  },
  ifYourCityNot: {
    id: `${scope}.if_your_city_not`,
    defaultMessage: 'Если вашего города нет в списке выше - воспользуйтесь поиском.',
  },
})
