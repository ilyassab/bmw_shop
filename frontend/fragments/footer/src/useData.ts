import gql from 'graphql-tag'

const query = gql`
  query Handbook {
    handbook(xSiteId: S1) {
      code
      value
    }
  }
`

export const useData = async client => {
  const { data } = await client.query({ query })
  const phone = data.handbook.find(item => item.code === 'phone')

  return phone && phone.value
}
