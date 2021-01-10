import gql from 'graphql-tag'

export const query = gql`
  query Page {
    page(xSiteId: S1, idOrSlug: "faq") {
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

export const useData = async client => {
  const { data } = await client.query({ query })

  return data.page
}
