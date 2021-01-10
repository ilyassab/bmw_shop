import gql from 'graphql-tag'

const query = gql`
  query News($id: Int!) {
    getNewsId(xSiteId: S1, id: $id) {
      content {
        time
        blocks {
          data {
            embed
            file {
              url
            }
            text
            items
            width
            style
            service
            stretched
            images
          }
          type
        }
      }
      date
      description
      fullImage
      h1
      id
      name
      title
      views
    }
  }
`

export const useData = async (id, client) => {
  const { data } = await client.query({
    query,
    variables: {
      id: Number(id),
    },
  })

  return data.getNewsId
}
