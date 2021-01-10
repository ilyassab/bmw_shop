import gql from 'graphql-tag'

const query = gql`
  query Categories($iblock: Iblock!) {
    categories(iblock: $iblock) {
      items {
        name
        slug
      }
    }
  }
`

export const useData = async (client, iblock) => {
  const { data } = await client.query({
    query,
    variables: {
      iblock,
    },
  })

  return data && data.categories && data.categories.items
}
