import gql                     from 'graphql-tag'
import { useApolloClient }     from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

export const phoneQuery = gql`
  query Handbook {
    handbook(xSiteId: S1) {
      code
      value
    }
  }
`

export const useData = () => {
  const [phone, setPhone] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data: phoneData } = await client.query({ query: phoneQuery })
        const contactPhone = phoneData.handbook.find(item => item.code === 'phone')
        setPhone(contactPhone.value)
      } catch {
        setPhone('')
      }
    }
    fetchQuery()
  }, [])

  return {
    phone,
  }
}
