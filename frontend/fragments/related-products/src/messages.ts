import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  withThisOffer: {
    id: `${scope}.with_this_offer`,
    defaultMessage: 'С этим товаром также покупают.',
  },
  closeOffers: {
    id: `${scope}.close_offers`,
    defaultMessage: 'Похожие товары',
  },
})
