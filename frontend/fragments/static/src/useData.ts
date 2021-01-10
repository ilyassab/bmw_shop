import gql from 'graphql-tag'

export const query = gql`
  query Page($idOrSlug: String!) {
    page(xSiteId: S1, idOrSlug: $idOrSlug) {
      name
      description
      h1
      title
      content {
        time
        blocks {
          type
          data {
            anchor
            caption
            embed
            file {
              url
            }
            height
            images
            items
            level
            service
            source
            stretched
            style
            text
            title
            width
            withBackground
            withBorder
          }
        }
      }
    }
  }
`

export const useData = async (client, idOrSlug) => {
  const { data } = await client.query({ query, errorPolicy: 'all', variables: { idOrSlug } })

  return data.page
}
