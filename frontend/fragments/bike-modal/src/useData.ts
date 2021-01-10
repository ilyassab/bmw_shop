import gql from 'graphql-tag'

export const query = gql`
  query page {
    page(idOrSlug: "bike-size", xSiteId: S1) {
      content {
        blocks {
          data {
            anchor
            text
            content
            file {
              url
            }
            stretched
            title
          }
          type
        }
      }
      description
      h1
      id
      name
      slug
      title
    }
  }
`

export const useData = async client => {
  const { data } = await client.query({ query })

  return data && data.page
}
