import gql from 'graphql-tag'

export const query = gql`
  query Menu {
    menu(xSiteId: S1) {
      code
      items {
        anchor
        filter
        items {
          anchor
          filter
          name
          url
          items {
            anchor
            filter
            name
            url
            items {
              anchor
              filter
              name
              url
            }
          }
        }
        name
        openInNewWindow
        slug
        url
      }
    }
  }
`

export const useData = async client => {
  const { data } = await client.query({ query })

  const footer = data.menu.find(item => item.code === 'footer')

  return footer && footer.items
}
