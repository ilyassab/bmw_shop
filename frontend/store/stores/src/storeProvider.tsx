import { createElement }           from 'react'

import { BasketStoreProvider }     from './basketStore'
import { CatalogStoreProvider }    from './catalogStore'
import { CheckoutStoreProvider }   from './checkoutStore'
import { CityStoreProvider }       from './cityStore'
import { FavoriteStoreProvider }   from './favoriteStore'
import { NavigationStoreProvider } from './navigationStore'
import { NotifyStoreProvider }     from './notifyStore'
import { bmwFilterStoreProvider }  from './bmwFilterStore'

const compose = (providers, children) =>
  providers.reduce((acc, [Provider, value]) => {
    return createElement(
      Provider,
      {
        ...value,
      },
      acc
    )
  }, children)

export const StoreProvider = props => {
  return compose(
    [
      [CityStoreProvider, props],
      [BasketStoreProvider, props],
      [NavigationStoreProvider, props],
      [CheckoutStoreProvider, props],
      [FavoriteStoreProvider, props],
      [NotifyStoreProvider, props],
      [bmwFilterStoreProvider, props],
      [CatalogStoreProvider, props],
    ],
    props.children
  )
}
