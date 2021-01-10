import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  thanks: {
    id: `${scope}.thanks`,
    defaultMessage: 'Спасибо за заказ!',
  },
  agreement: {
    id: `${scope}.agreement`,
    defaultMessage: 'Подтверждение заказа выслано на вашу электронную почту.',
  },
  yourOrder: {
    id: `${scope}.yourOrder`,
    defaultMessage: 'Ваш номер заказа - ',
  },
  soon: {
    id: `${scope}.soon`,
    defaultMessage: 'В скором времени оператор магазина связжется с вами по телефону.',
  },
  continue: {
    id: `${scope}.continue`,
    defaultMessage: 'Продолжить покупки',
  },
})
