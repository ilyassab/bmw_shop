import gql from 'graphql-tag'

const query = gql`
  query News($page: Int, $perPage: Int) {
    news(xSiteId: S1, page: $page, perPage: $perPage) {
      page
      pages
      perPage
      total
      items {
        date
        id
        name
        previewImage
        text
        views
      }
    }
  }
`

export const useData = async (perPage, page, client) => {
  const { data } = await client.query({
    query,
    variables: {
      perPage,
      page,
    },
  })

  return data && data.news
}
