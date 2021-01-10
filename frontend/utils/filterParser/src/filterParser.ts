import Router from 'next/router'
import parse  from 'url-parse'

// TODO shallow: true не работает как должен. Используется event не из доки (но из кода next),
// чтобы реагировать на изменение url без перезагрузки страницы. Ссылка на router
// https://github.com/vercel/next.js/blob/ ... /packages/next/next-server/lib/router/router.ts.
// Необходимо избавиться от window.history.pushState -> Router.push(..., ..., { shallow:true })

export const filterParser = {
  addFilter: (key, value) => {
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    if (!parsedQuery.filters) {
      parsedQuery.filters = '[]'
    }
    const filters = JSON.parse(decodeURI(parsedQuery.filters))
    let isFilterExist = false
    filters.forEach(filter => {
      if (filter.key === key) {
        filter.value.push(value)
        isFilterExist = true
      }
    })
    if (!isFilterExist) {
      filters.push({ key, value: [value] })
    }
    parsedQuery.filters = encodeURI(JSON.stringify(filters))
    delete parsedQuery.page
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
  },
  removeFilter: (key, value) => {
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    if (!parsedQuery.filters) {
      parsedQuery.filters = '[]'
    }
    const filters = JSON.parse(decodeURI(parsedQuery.filters))
    filters.forEach((filter, index) => {
      if (filter.key === key) {
        if (filter.value.length === 1) {
          filters.splice(index, 1)
        } else {
          const filterIndex = filter.value.findIndex(filterText => filterText === value)
          filter.value.splice(filterIndex, 1)
        }
      }
    })
    if (filters.length === 0) {
      delete parsedQuery.filters
    } else {
      parsedQuery.filters = encodeURI(JSON.stringify(filters))
    }
    delete parsedQuery.page
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
  },
  changePage: newPage => {
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    parsedQuery.page = encodeURI(JSON.stringify(newPage))
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: {
          pathname: Router.router.pathname,
          query: { slug, ...parsedQuery },
        },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
  },
  addCategory: category => {
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    parsedQuery.category = encodeURI(category)
    parsedQuery.page = encodeURI(JSON.stringify(1))
    delete parsedQuery.filters
    delete parsedQuery.price
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
  },
  removeCategory: () => {
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    parsedQuery.page = encodeURI(JSON.stringify(1))
    delete parsedQuery.filters
    delete parsedQuery.category
    delete parsedQuery.price
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
  },
  addSort: sort => {
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    if (sort) {
      parsedQuery.sort = encodeURI(sort)
    } else {
      delete parsedQuery.sort
    }
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
  },
  addPriceFilter: (key, min, max) => {
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    parsedQuery.price = encodeURI(JSON.stringify([{ key, value: [min, max] }]))
    delete parsedQuery.page
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
  },
  addAdditionalFilter: (
    additionalFilterArray,
    series,
    carcase,
    model,
    shouldDeleteModelFilter = false
  ) => {
    /*eslint-disable*/
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    if (!parsedQuery.additionalFilter) {
      parsedQuery.additionalFilter = '[]'
    }
    let currentAdditionalFilter = []
    if (!shouldDeleteModelFilter) {
      currentAdditionalFilter = JSON.parse(decodeURI(parsedQuery.additionalFilter))
    }
    additionalFilterArray.map(additionalFilterObject => {
      let isFilterAlreadyExist = false
      currentAdditionalFilter.map(currentAdditionalObject => {
        if (currentAdditionalObject.key === additionalFilterObject.key) {
          isFilterAlreadyExist = true
          currentAdditionalObject.value = additionalFilterObject.value
        }
      })
      if (!isFilterAlreadyExist) {
        currentAdditionalFilter.push(additionalFilterObject)
      }
    })
    parsedQuery.additionalFilter = encodeURI(JSON.stringify(currentAdditionalFilter))
    parsedQuery.series = encodeURI(series)
    parsedQuery.carcase = encodeURI(carcase)
    parsedQuery.model = encodeURI(model)
    delete parsedQuery.page
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
    /* eslint-enable */
  },
  resetAdditionalFilter: () => {
    if (window) {
      const parsedUrl = parse(window.location.href, true)
      const parsedQuery = parsedUrl.query
      const slug = Router.router.query && Router.router.query.slug
      delete parsedQuery.additionalFilter
      delete parsedQuery.series
      delete parsedQuery.carcase
      delete parsedQuery.model
      delete parsedQuery.page
      const newLink = parsedUrl.set('query', parsedQuery)
      window.history.pushState(
        {
          as: newLink.href.replace(newLink.origin, ''),
          url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
          options: { shallow: true },
        },
        '',
        newLink.href.replace(newLink.origin, '')
      )
      Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
    }
  },
  resetPriceAndFilters: () => {
    const parsedUrl = parse(window.location.href, true)
    const parsedQuery = parsedUrl.query
    const slug = Router.router.query && Router.router.query.slug
    delete parsedQuery.filters
    delete parsedQuery.price
    delete parsedQuery.page
    const newLink = parsedUrl.set('query', parsedQuery)
    window.history.pushState(
      {
        as: newLink.href.replace(newLink.origin, ''),
        url: { pathname: Router.router.pathname, query: { slug, ...parsedQuery } },
        options: { shallow: true },
      },
      '',
      newLink.href.replace(newLink.origin, '')
    )
    Router.events.emit('routeChangeComplete', newLink.href.replace(newLink.origin, ''))
  },
}
